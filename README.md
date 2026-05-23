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
  - `http://localhost:3000/api/ranking`
  - `http://localhost:3000/api/latest`

## API Response Format

Semua endpoint API harus mengembalikan response dengan format yang konsisten berikut:

```json
{
  "status": "OK",
  "message": "Successfully fetched data.",
  "error": [],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 10
  },
  "data": [...] // atau {...}
}
```

### Penjelasan Field

| Field | Tipe | Deskripsi |
|-------|------|-----------|
| `status` | string | Status response. Gunakan `"OK"` untuk success, `"ERROR"` untuk error. |
| `message` | string | Pesan deskriptif tentang response. |
| `error` | array | Array of error messages. Kosong `[]` jika tidak ada error. |
| `meta` | object | Metadata tentang response (pagination, dll). |
| `meta.total` | number | Total jumlah data yang tersedia. |
| `meta.page` | number | Nomor halaman saat ini (untuk pagination). |
| `meta.limit` | number | Jumlah data per halaman. |
| `data` | array \| object | Data utama yang dikembalikan. Bisa berupa Array (dependen/list) atau Object (independen/detail). |

### Contoh Response Success (Dependen/List)

```json
{
  "status": "OK",
  "message": "Successfully fetched ranking comics.",
  "error": [],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10
  },
  "data": [
    {
      "id": "1",
      "title": "Attack on Titan",
      "thumbnail": "https://example.com/image.jpg"
    }
  ]
}
```

### Contoh Response Success (Independen/Detail)

```json
{
  "status": "OK",
  "message": "Successfully fetched comic details.",
  "error": [],
  "meta": null,
  "data": {
    "id": "1",
    "title": "Attack on Titan",
    "description": "...",
    "thumbnail": "https://example.com/image.jpg"
  }
}
```

### Contoh Response Error

```json
{
  "status": "ERROR",
  "message": "Failed to fetch comics.",
  "error": ["Invalid page number", "Page must be greater than 0"],
  "meta": {
    "total": 0,
    "page": 0,
    "limit": 0
  },
  "data": []
}
```

## Contributing

Ikuti aturan kontribusi pada file [CONTIBUTING.md](./CONTIBUTING.md).
