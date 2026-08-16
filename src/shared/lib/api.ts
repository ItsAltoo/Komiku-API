import axios, { type InternalAxiosRequestConfig } from "axios";
import axiosRetryImport, { type IAxiosRetryConfig } from "axios-retry";
import https from "node:https";
import dotenv from "dotenv";

// axios-retry ships dual ESM/CJS builds; some bundlers/type-resolvers land on
// the module namespace instead of the callable default export, so unwrap it
// defensively instead of relying on the default import always being callable.
type AxiosRetryFn = (
  instance: ReturnType<typeof axios.create>,
  config?: IAxiosRetryConfig,
) => unknown;
const axiosRetry =
  (axiosRetryImport as unknown as { default?: AxiosRetryFn }).default ??
  (axiosRetryImport as unknown as AxiosRetryFn);

dotenv.config();

// Netlify Functions kills the invocation at 10s (hard limit, not extendable
// on the free plan) and bills the full time consumed even on failure, so the
// whole request+retry budget must stay comfortably under that.
const REQUEST_BUDGET_MS = 9000;
const RETRY_DELAY_MS = 300;
const MIN_RETRY_TIMEOUT_MS = 1500;

const keepAliveAgent = new https.Agent({ keepAlive: true });

const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};

type TimedRequestConfig = InternalAxiosRequestConfig & { startedAt?: number };

const configure = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use((config: TimedRequestConfig) => {
    config.startedAt = Date.now();
    return config;
  });

  axiosRetry(instance, {
    retries: 1,
    retryDelay: () => RETRY_DELAY_MS,
    // Only retry connection-level failures (reset/refused/TLS handshake
    // drops) or upstream 5xx. Skip our own timeout (ECONNABORTED) — if the
    // budget already ran out once, retrying won't fit anyway.
    retryCondition: (error) => {
      if (error.code === "ECONNABORTED") return false;
      return !error.response || error.response.status >= 500;
    },
    onRetry: (_retryCount, _error, requestConfig) => {
      const startedAt = (requestConfig as TimedRequestConfig).startedAt ?? Date.now();
      const elapsed = Date.now() - startedAt;
      const remaining = REQUEST_BUDGET_MS - elapsed - RETRY_DELAY_MS;
      requestConfig.timeout = Math.max(MIN_RETRY_TIMEOUT_MS, remaining);
    },
  });

  return instance;
};

export const api = configure(
  axios.create({
    baseURL: process.env.BASE_URL as string,
    timeout: REQUEST_BUDGET_MS,
    headers: { ...defaultHeaders, Referer: process.env.BASE_URL || "" },
    httpsAgent: keepAliveAgent,
  }),
);

export const apiSecond = configure(
  axios.create({
    baseURL: process.env.API_URL as string,
    timeout: REQUEST_BUDGET_MS,
    headers: { ...defaultHeaders, Referer: process.env.API_URL || "" },
    httpsAgent: keepAliveAgent,
  }),
);
