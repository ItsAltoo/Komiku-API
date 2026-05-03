import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const api = axios.create({
  baseURL: process.env.BASE_URL as string,
});

export const apiSecond = axios.create({
  baseURL: process.env.API_URL as string,
});
