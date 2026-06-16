# Komiku REST API Documentation

> **Base URL:** `http://localhost:3000/api`
>
> **Version:** 2.0.0

All endpoints use the **GET** method. Responses (unless noted otherwise) follow the standard wrapper format:

```json
{
  "status": "OK",
  "message": "Success message",
  "error": [],
  "meta": null,
  "data": []
}
```

---

## Authentication & Security

All `/api` endpoints are protected and require an API Key. You must include the `x-api-key` header in every request.

**Example Request:**
```bash
curl -H "x-api-key: your_secret_api_key_here" http://localhost:3000/api/latest
```

If the API key is missing or invalid, the API will return a `401 Unauthorized` error.

## Rate Limiting

To prevent abuse, the API enforces a rate limit of **200 requests per 90 seconds** per IP address. If you exceed this limit, you will receive a `429 Too Many Requests` response.

---

## Table of Contents

| #   | Endpoint                                             | Description                          |
| --- | ---------------------------------------------------- | ------------------------------------ |
| 1   | [`/ranking`](#1-ranking)                             | Get comic rankings                   |
| 2   | [`/latest-list`](#2-latest-list)                     | Get latest updated comics (homepage) |
| 3   | [`/popular-update`](#3-popular-update)               | Get popular updated comics           |
| 4   | [`/just-added`](#4-just-added)                       | Get newly added comics               |
| 5   | [`/featured-genres`](#5-featured-genres)             | Get featured genre collections       |
| 6   | [`/latest`](#6-latest)                               | Get latest comics with filters       |
| 7   | [`/popular`](#7-popular)                             | Get popular comics with filters      |
| 8   | [`/comic-list`](#8-comic-list)                       | Browse comics alphabetically         |
| 9   | [`/detail/:slug`](#9-detail)                         | Get comic detail                     |
| 10  | [`/detail/:slug/similar-comics`](#10-similar-comics) | Get similar comics                   |
| 11  | [`/genres`](#11-genres)                              | Get all available genres             |
| 12  | [`/read/:slug`](#12-read)                            | Read a chapter                       |
| 13  | [`/search`](#13-search)                              | Search for comics                    |
| 14  | [`/proxy-image`](#14-proxy-image)                    | Proxy an image URL                   |

---

## Shared Types

These types are reused across multiple endpoints:

```
BaseComic {
  title: string
  slug: string
  thumbnail: string
}

BaseChapter {
  title: string
  slug: string
}

KomikType = "manga" | "manhwa" | "manhua"
```

---

## 1. Ranking

Get comic rankings by period.

```
GET /api/ranking
```

### Query Parameters

| Name     | Type   | Required | Default | Allowed Values           |
| -------- | ------ | -------- | ------- | ------------------------ |
| `period` | string | No       | `"all"` | `daily`, `weekly`, `all` |

### Example Request

```
GET /api/ranking?period=daily
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched ranking",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "Solo Leveling",
      "slug": "solo-leveling",
      "thumbnail": "https://...",
      "status": {
        "genre": "Action",
        "views": "1.2M"
      },
      "latestChapter": "Chapter 200",
      "latestChapterSlug": "solo-leveling-chapter-200",
      "rank": "1"
    }
  ]
}
```

### Response Type

| Field               | Type   | Description          |
| ------------------- | ------ | -------------------- |
| `title`             | string | Comic title          |
| `slug`              | string | Comic slug           |
| `thumbnail`         | string | Thumbnail image URL  |
| `status.genre`      | string | Genre label          |
| `status.views`      | string | View count text      |
| `latestChapter`     | string | Latest chapter title |
| `latestChapterSlug` | string | Latest chapter slug  |
| `rank`              | string | Rank number          |

---

## 2. Latest List

Get latest updated comics from the homepage section.

```
GET /api/latest-list
```

### Query Parameters

None.

### Example Request

```
GET /api/latest-list
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched latest list",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "One Piece",
      "slug": "one-piece",
      "thumbnail": "https://...",
      "updateCount": "+3",
      "status": {
        "genre": "Adventure",
        "timeAgo": "2 jam lalu"
      },
      "latestChapter": "Chapter 1120",
      "latestChapterSlug": "one-piece-chapter-1120",
      "flag": "https://..."
    }
  ]
}
```

### Response Type

| Field               | Type   | Description                         |
| ------------------- | ------ | ----------------------------------- |
| `title`             | string | Comic title                         |
| `slug`              | string | Comic slug                          |
| `thumbnail`         | string | Thumbnail image URL                 |
| `updateCount`       | string | Number of new updates (e.g. `"+3"`) |
| `status.genre`      | string | Genre label                         |
| `status.timeAgo`    | string | Time since last update              |
| `latestChapter`     | string | Latest chapter title                |
| `latestChapterSlug` | string | Latest chapter slug                 |
| `flag`              | string | Country flag image URL              |

---

## 3. Popular Update

Get popular updated comics.

```
GET /api/popular-update
```

### Query Parameters

| Name   | Type      | Required | Default | Allowed Values              |
| ------ | --------- | -------- | ------- | --------------------------- |
| `type` | KomikType | No       | `"all"` | `manga`, `manhwa`, `manhua` |

### Example Request

```
GET /api/popular-update?type=manhwa
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched popular update",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "Tower of God",
      "slug": "tower-of-god",
      "thumbnail": "https://...",
      "updateCount": "+2",
      "status": {
        "genre": "Fantasy",
        "views": "500K"
      },
      "latestChapter": "Chapter 600",
      "latestChapterSlug": "tower-of-god-chapter-600",
      "flag": "https://..."
    }
  ]
}
```

### Response Type

| Field               | Type   | Description            |
| ------------------- | ------ | ---------------------- |
| `title`             | string | Comic title            |
| `slug`              | string | Comic slug             |
| `thumbnail`         | string | Thumbnail image URL    |
| `updateCount`       | string | Number of new updates  |
| `status.genre`      | string | Genre label            |
| `status.views`      | string | View count text        |
| `latestChapter`     | string | Latest chapter title   |
| `latestChapterSlug` | string | Latest chapter slug    |
| `flag`              | string | Country flag image URL |

---

## 4. Just Added

Get newly added comics.

```
GET /api/just-added
```

### Query Parameters

| Name   | Type      | Required | Default | Allowed Values              |
| ------ | --------- | -------- | ------- | --------------------------- |
| `type` | KomikType | No       | `"all"` | `manga`, `manhwa`, `manhua` |

### Example Request

```
GET /api/just-added?type=manga
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched just added comics",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "New Comic Title",
      "slug": "new-comic-title",
      "thumbnail": "https://...",
      "updateCount": "+1",
      "status": {
        "genre": "Romance",
        "views": "10K"
      },
      "latestChapter": "Chapter 1",
      "latestChapterSlug": "new-comic-title-chapter-1",
      "flag": "https://..."
    }
  ]
}
```

### Response Type

| Field               | Type   | Description            |
| ------------------- | ------ | ---------------------- |
| `title`             | string | Comic title            |
| `slug`              | string | Comic slug             |
| `thumbnail`         | string | Thumbnail image URL    |
| `updateCount`       | string | Number of new updates  |
| `status.genre`      | string | Genre label            |
| `status.views`      | string | View count text        |
| `latestChapter`     | string | Latest chapter title   |
| `latestChapterSlug` | string | Latest chapter slug    |
| `flag`              | string | Country flag image URL |

---

## 5. Featured Genres

Get featured genre collections from the homepage.

```
GET /api/featured-genres
```

### Query Parameters

| Name   | Type   | Required | Default | Allowed Values                                                                                                 |
| ------ | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `name` | string | No       | `"all"` | `isekai`, `fantasy`, `romance`, `ecchi`, `drama`, `sliceOfLife`, `schoolLife`, `comedy`, `action`, `adventure` |

### Example Request

```
GET /api/featured-genres?name=isekai
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched featured genres",
  "error": [],
  "meta": null,
  "data": [
    {
      "genre": "Komik Isekai",
      "items": [
        {
          "title": "That Time I Got Reincarnated as a Slime",
          "slug": "tensei-shitara-slime-datta-ken",
          "thumbnail": "https://...",
          "flag": "https://...",
          "status": {
            "genre": "Isekai",
            "views": "800K"
          },
          "latestChapter": "Chapter 110",
          "latestChapterSlug": "tensei-shitara-slime-chapter-110"
        }
      ]
    }
  ]
}
```

### Response Type

**FeaturedGenreGroup:**

| Field   | Type                 | Description                   |
| ------- | -------------------- | ----------------------------- |
| `genre` | string               | Genre section heading         |
| `items` | FeaturedGenreComic[] | Array of comics in this genre |

**FeaturedGenreComic:**

| Field               | Type   | Description            |
| ------------------- | ------ | ---------------------- |
| `title`             | string | Comic title            |
| `slug`              | string | Comic slug             |
| `thumbnail`         | string | Thumbnail image URL    |
| `flag`              | string | Country flag image URL |
| `status.genre`      | string | Genre label            |
| `status.views`      | string | View count text        |
| `latestChapter`     | string | Latest chapter title   |
| `latestChapterSlug` | string | Latest chapter slug    |

---

## 6. Latest

Get latest comics with full filtering and pagination support.

```
GET /api/latest
```

### Query Parameters

| Name      | Type      | Required | Default | Allowed Values                        |
| --------- | --------- | -------- | ------- | ------------------------------------- |
| `page`    | number    | No       | `1`     | Any positive integer                  |
| `orderBy` | string    | No       | -       | `modified`, `date`, `rand`, `ranking` |
| `type`    | KomikType | No       | -       | `manga`, `manhwa`, `manhua`           |
| `genre`   | GenreType | No       | -       | See [Genres](#11-genres) endpoint     |
| `genre2`  | GenreType | No       | -       | See [Genres](#11-genres) endpoint     |
| `status`  | string    | No       | -       | `ongoing`, `end`                      |

### Example Request

```
GET /api/latest?page=2&type=manhwa&genre=action&orderBy=ranking
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched latest comics",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "Solo Leveling",
      "slug": "solo-leveling",
      "thumbnail": "https://...",
      "description": "Sung Jin-Woo adalah seorang hunter...",
      "updateCount": "+5",
      "status": {
        "views": "1.2M",
        "timeAgo": "1 jam lalu",
        "isColored": true
      },
      "chapters": {
        "initial": {
          "title": "Chapter 1",
          "slug": "solo-leveling-chapter-1"
        },
        "latest": {
          "title": "Chapter 200",
          "slug": "solo-leveling-chapter-200"
        }
      }
    }
  ]
}
```

### Response Type

| Field              | Type        | Description                         |
| ------------------ | ----------- | ----------------------------------- |
| `title`            | string      | Comic title                         |
| `slug`             | string      | Comic slug                          |
| `thumbnail`        | string      | Thumbnail image URL                 |
| `description`      | string      | Short comic description             |
| `updateCount`      | string      | Number of new updates               |
| `status.views`     | string      | View count text                     |
| `status.timeAgo`   | string      | Time since last update              |
| `status.isColored` | boolean     | Whether the comic is colored        |
| `chapters.initial` | BaseChapter | First chapter (`title` and `slug`)  |
| `chapters.latest`  | BaseChapter | Latest chapter (`title` and `slug`) |

---

## 7. Popular

Get popular comics with pagination and filtering.

```
GET /api/popular
```

### Query Parameters

| Name      | Type      | Required | Default | Allowed Values                        |
| --------- | --------- | -------- | ------- | ------------------------------------- |
| `page`    | number    | No       | `1`     | Any positive integer                  |
| `orderBy` | string    | No       | -       | `modified`, `date`, `rand`, `ranking` |
| `type`    | KomikType | No       | -       | `manga`, `manhwa`, `manhua`           |

### Example Request

```
GET /api/popular?page=1&orderBy=ranking&type=manga
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched popular comics",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "One Piece",
      "slug": "one-piece",
      "thumbnail": "https://...",
      "description": "Gol D. Roger dikenal sebagai...",
      "updateCount": "+10",
      "status": {
        "views": "5M",
        "timeAgo": "3 jam lalu",
        "isColored": false
      },
      "chapters": {
        "initial": {
          "title": "Chapter 1",
          "slug": "one-piece-chapter-1"
        },
        "latest": {
          "title": "Chapter 1120",
          "slug": "one-piece-chapter-1120"
        }
      }
    }
  ]
}
```

### Response Type

| Field              | Type        | Description                         |
| ------------------ | ----------- | ----------------------------------- |
| `title`            | string      | Comic title                         |
| `slug`             | string      | Comic slug                          |
| `thumbnail`        | string      | Thumbnail image URL                 |
| `description`      | string      | Short comic description             |
| `updateCount`      | string      | Number of new updates               |
| `status.views`     | string      | View count text                     |
| `status.timeAgo`   | string      | Time since last update              |
| `status.isColored` | boolean     | Whether the comic is colored        |
| `chapters.initial` | BaseChapter | First chapter (`title` and `slug`)  |
| `chapters.latest`  | BaseChapter | Latest chapter (`title` and `slug`) |

---

## 8. Comic List

Browse comics alphabetically with pagination.

```
GET /api/comic-list
```

### Query Parameters

| Name     | Type      | Required | Default | Allowed Values                      |
| -------- | --------- | -------- | ------- | ----------------------------------- |
| `page`   | number    | No       | `1`     | Any positive integer                |
| `type`   | KomikType | No       | -       | `manga`, `manhwa`, `manhua`         |
| `letter` | string    | No       | -       | `A` – `Z` (single uppercase letter) |

### Example Request

```
GET /api/comic-list?page=1&type=manga&letter=S
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched comic list",
  "error": [],
  "meta": null,
  "data": [
    {
      "heading": "Daftar Manga",
      "list": [
        {
          "title": "Solo Leveling",
          "slug": "solo-leveling",
          "thumbnail": "https://...",
          "status": {
            "release": "Ongoing",
            "type": "Manga",
            "genre": "Action"
          }
        }
      ]
    }
  ]
}
```

### Response Type

**ComicListGroup:**

| Field     | Type            | Description       |
| --------- | --------------- | ----------------- |
| `heading` | string          | Page heading text |
| `list`    | ComicListItem[] | Array of comics   |

**ComicListItem:**

| Field            | Type   | Description                       |
| ---------------- | ------ | --------------------------------- |
| `title`          | string | Comic title                       |
| `slug`           | string | Comic slug                        |
| `thumbnail`      | string | Thumbnail image URL               |
| `status.release` | string | Release status (e.g. `"Ongoing"`) |
| `status.type`    | string | Comic type label                  |
| `status.genre`   | string | Genre label                       |

---

## 9. Detail

Get detailed information about a specific comic.

```
GET /api/detail/:slug
```

### Route Parameters

| Name   | Type   | Required | Description           |
| ------ | ------ | -------- | --------------------- |
| `slug` | string | Yes      | Comic slug identifier |

### Example Request

```
GET /api/detail/solo-leveling
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched detail",
  "error": [],
  "meta": null,
  "data": {
    "title": "Solo Leveling",
    "thumbnail": "https://...",
    "synopsis": "10 tahun yang lalu, setelah 'Gate'...",
    "description": {
      "title": "Solo Leveling",
      "alternativeTitle": "Naik Level Sendiri",
      "type": "Manhwa",
      "theme": "Fantasi",
      "genres": [
        "Action",
        "Adventure",
        "Drama",
        "Fantasy",
        "Shounen",
        "Super Power"
      ],
      "author": "Chugong",
      "status": "End",
      "rating": "15+",
      "views": "Total: 55311756 views, Minggu ini: 35720 views",
      "readingDirection": "Kiri ke kanan"
    },
    "chapters": {
      "initial": {
        "title": "Chapter 1",
        "slug": "solo-leveling-chapter-1"
      },
      "latest": {
        "title": "Chapter 200",
        "slug": "solo-leveling-chapter-200"
      }
    },
    "chapterList": [
      {
        "title": "Chapter 200",
        "slug": "solo-leveling-chapter-200",
        "date": "10 Januari 2024"
      }
    ]
  }
}
```

### Response Type

| Field                 | Type                 | Description                                                                              |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `title`               | string               | Comic title                                                                              |
| `thumbnail`           | string               | Thumbnail image URL                                                                      |
| `synopsis`            | string               | Full comic synopsis                                                                      |
| `description`         | object               | Dynamic key-value info from the comic detail table                                       |
| `description.genres`  | string[]             | Array of genre names (special key)                                                       |
| `description.*`       | string               | Other dynamic fields (e.g. `alternativeTitle`, `status`, `author`, `comicType`, `views`) |
| `chapters.initial`    | BaseChapter          | First chapter (`title` and `slug`)                                                       |
| `chapters.latest`     | BaseChapter          | Latest chapter (`title` and `slug`)                                                      |
| `chapterList`         | ComicDetailChapter[] | Full list of all chapters                                                                |
| `chapterList[].title` | string               | Chapter title                                                                            |
| `chapterList[].slug`  | string               | Chapter slug                                                                             |
| `chapterList[].date`  | string               | Chapter release date                                                                     |

> **Note:** The `description` field is a dynamic object. The Indonesian labels from the source website are automatically mapped to English camelCase keys (e.g. `judul_alternatif` becomes `alternativeTitle`, `pembaca` becomes `views`, `pengarang` becomes `author`, `jenis_komik` becomes `comicType`, `konsep_cerita` becomes `storyConcept`). The `genres` key is always a `string[]` array, while all other keys are `string` values.

---

## 10. Similar Comics

Get comics similar to a specific comic.

```
GET /api/detail/:slug/similar-comics
```

### Route Parameters

| Name   | Type   | Required | Description           |
| ------ | ------ | -------- | --------------------- |
| `slug` | string | Yes      | Comic slug identifier |

### Example Request

```
GET /api/detail/solo-leveling/similar-comics
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched similar comics",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "Omniscient Reader's Viewpoint",
      "slug": "omniscient-readers-viewpoint",
      "thumbnail": "https://...",
      "views": "2.5M",
      "description": "Dokja adalah pembaca biasa..."
    }
  ]
}
```

### Response Type

| Field         | Type   | Description         |
| ------------- | ------ | ------------------- |
| `title`       | string | Comic title         |
| `slug`        | string | Comic slug          |
| `thumbnail`   | string | Thumbnail image URL |
| `views`       | string | View count text     |
| `description` | string | Short description   |

---

## 11. Genres

Get all available genres. Useful for building filter dropdowns.

```
GET /api/genres
```

### Query Parameters

None.

### Example Request

```
GET /api/genres
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched genres",
  "error": [],
  "meta": null,
  "data": [
    {
      "value": "action",
      "text": "Action"
    },
    {
      "value": "adventure",
      "text": "Adventure"
    },
    {
      "value": "comedy",
      "text": "Comedy"
    }
  ]
}
```

### Response Type

| Field   | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| `value` | string | Genre slug (use this for filtering) |
| `text`  | string | Genre display name                  |

---

## 12. Read

Read a specific chapter. Returns chapter images and navigation info.

```
GET /api/read/:slug
```

### Route Parameters

| Name   | Type   | Required | Description             |
| ------ | ------ | -------- | ----------------------- |
| `slug` | string | Yes      | Chapter slug identifier |

### Example Request

```
GET /api/read/solo-leveling-chapter-1
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched read data",
  "error": [],
  "meta": null,
  "data": {
    "title": "Solo Leveling Chapter 1",
    "navigation": {
      "list": "solo-leveling",
      "next": "solo-leveling-chapter-2",
      "prev": ""
    },
    "images": [
      "/api/proxy-image?url=https%3A%2F%2F...",
      "/api/proxy-image?url=https%3A%2F%2F..."
    ]
  }
}
```

### Response Type

| Field             | Type     | Description                                          |
| ----------------- | -------- | ---------------------------------------------------- |
| `title`           | string   | Chapter page title                                   |
| `navigation.list` | string   | Slug for the comic detail page                       |
| `navigation.next` | string   | Slug for the next chapter (empty string if none)     |
| `navigation.prev` | string   | Slug for the previous chapter (empty string if none) |
| `images`          | string[] | Array of proxied image URLs                          |

---

## 13. Search

Search for comics by a query string.

```
GET /api/search
```

### Query Parameters

| Name    | Type   | Required | Description       |
| ------- | ------ | -------- | ----------------- |
| `query` | string | Yes      | Comic search term |

### Example Request

```
GET /api/search?query=black+clover
```

### Response

```json
{
  "status": "OK",
  "message": "Successfully fetched search results",
  "error": [],
  "meta": null,
  "data": [
    {
      "title": "Black Clover",
      "slug": "black-clover",
      "thumbnail": "https://...",
      "type": "Manga",
      "status": "Update 1 minggu lalu.",
      "chapters": {
        "initial": {
          "title": "Chapter 1",
          "slug": "black-clover-chapter-1"
        },
        "latest": {
          "title": "Chapter 368",
          "slug": "black-clover-chapter-368"
        }
      }
    }
  ]
}
```

### Response Type

| Field               | Type        | Description                         |
| ------------------- | ----------- | ----------------------------------- |
| `title`             | string      | Comic title                         |
| `slug`              | string      | Comic slug                          |
| `thumbnail`         | string      | Thumbnail image URL                 |
| `type`              | string      | Comic type label (e.g. "Manga")     |
| `status`            | string      | Update description                  |
| `chapters.initial`  | BaseChapter | First chapter (`title` and `slug`)  |
| `chapters.latest`   | BaseChapter | Latest chapter (`title` and `slug`) |

---

## 14. Proxy Image

Proxy an image from the source website. Used internally by the `/read` endpoint to serve chapter images.

```
GET /api/proxy-image
```

### Query Parameters

| Name  | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| `url` | string | Yes      | Full URL of the image to proxy |

### Example Request

```
GET /api/proxy-image?url=https://example.com/image.jpg
```

### Response

Returns the raw image binary with the original `Content-Type` header. This endpoint does **not** use the standard JSON response wrapper.

### Error Responses

| Status          | Body                                   | Cause                         |
| --------------- | -------------------------------------- | ----------------------------- |
| `400`           | `{ "error": "Image URL is required" }` | Missing `url` query parameter |
| Upstream status | Upstream status text                   | Image fetch failed            |

---

## Error Response Format

When an error occurs, endpoints return the following structure:

```json
{
  "status": "ERROR",
  "message": "Error message here",
  "error": ["Detailed error description"],
  "meta": {
    "total": 0,
    "page": 0,
    "limit": 0
  },
  "data": []
}
```
