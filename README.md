# Komiku API v2

REST API berbasis Express untuk data komik Komiku.

## Menjalankan Aplikasi

### 1. Clone repository

```bash
git clone https://github.com/ItsAltoo/Komiku-API-v.2.git
cd Komiku-API-v.2
```

### 2. Install dependencies

Gunakan package manager yang sama dengan lockfile proyek.

```bash
pnpm install
```

Jika belum memakai pnpm, bisa gunakan:

```bash
npm install
```

### 3. Atur environment

Buat file `.env` di root project (jika belum ada) dan isi:

```env
PORT=3000
```

`PORT` bersifat opsional. Jika tidak diisi, aplikasi tetap berjalan pada port default `3000`.

### 4. Jalankan mode development

Dengan pnpm:

```bash
pnpm dev
```

Dengan npm:

```bash
npm run dev
```

### 5. Cek aplikasi berjalan

- Root: `http://localhost:3000/`
- API info: `http://localhost:3000/api`
- Endpoint contoh:
  - `http://localhost:3000/api/recommended`
  - `http://localhost:3000/api/latest`

## Contributing

Ikuti aturan kontribusi pada file [CONTIBUTING.md](./CONTIBUTING.md).
