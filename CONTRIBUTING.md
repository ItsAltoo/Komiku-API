# Contributing Guide

Panduan ini wajib diikuti untuk semua kontribusi di repository ini.

## 1. Format Judul Issue

Gunakan format:

```text
[KA-<number>] <Judul Pekerjaan>
```

Contoh:

```text
[KA-1] Create Project
```

## 2. Format Nama Branch

Saat mulai kontribusi, branch **harus** memakai kode issue (contoh: `KA-1`).

Gunakan format:

```text
KA-<number>
```

Contoh:

```text
KA-1
```

## 3. Penulisan Commit yang Benar

Judul commit wajib diawali kode issue yang sama dengan issue dan branch.

Format:

```text
[KA-<number>] <aksi singkat dan jelas>
```

Contoh:

```text
[KA-1] Create Project
[KA-1] Add latest endpoint controller
[KA-1] Fix error response on recommended route
```

Aturan tambahan:

1. Satu commit untuk satu tujuan perubahan yang jelas.
2. Hindari judul commit yang terlalu umum seperti `update` atau `fix`.
3. Jangan mencantumkan email apa pun pada commit message (termasuk email Copilot atau email pribadi).

## 4. Penulisan Pull Request yang Benar

Gunakan judul PR dengan format:

```text
[KA-<number>] <Judul Pekerjaan>
```

Contoh:

```text
[KA-1] Create Project
```

Isi deskripsi Pull Request minimal:

1. Pastikan branch berasal dari kode issue yang benar.
2. Pastikan judul commit sudah sesuai format.
3. Ringkasan perubahan yang dilakukan.
4. Cara pengujian singkat.
5. Referensi issue terkait (contoh: `KA-1`).
6. Jangan mencantumkan email apa pun pada judul/deskripsi PR.
