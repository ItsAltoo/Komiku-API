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

Isi deskripsi Pull Request wajib menggunakan template berikut:

```markdown
## Summary
[Ringkasan singkat tentang apa yang dilakukan PR ini]

## Changes
### Files Created:
- `path/to/file` - [Deskripsi file baru]

### Files Modified:
- `path/to/file` - [Deskripsi perubahan pada file existing]

## Implementation Details
- [Detail teknis implementasi]
- [Library atau logic yang digunakan]

## Testing
[Cara pengujian fitur, contoh curl atau langkah-langkahnya]
```bash
# Contoh pengujian
GET /api/your-endpoint
```

## Acceptance Criteria Checklist
- [ ] [Kriteria 1]
- [ ] [Kriteria 2]

## Related Issue
Closes KA-<number>
```

Aturan tambahan:
1. Pastikan branch berasal dari kode issue yang benar.
2. Pastikan judul commit sudah sesuai format.
3. Jangan mencantumkan email apa pun pada judul/deskripsi PR.
