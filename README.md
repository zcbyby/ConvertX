![ConvertX](images/logo.png)

# ConvertX

[![Docker](https://github.com/C4illin/ConvertX/actions/workflows/docker-publish.yml/badge.svg?branch=main)](https://github.com/C4illin/ConvertX/actions/workflows/docker-publish.yml)
[![ghcr.io Pulls](https://img.shields.io/badge/dynamic/json?logo=github&url=https%3A%2F%2Fipitio.github.io%2Fbackage%2FC4illin%2FConvertX%2Fconvertx.json&query=%24.downloads&label=ghcr.io%20pulls&cacheSeconds=14400)](https://github.com/C4illin/ConvertX/pkgs/container/ConvertX)
[![GitHub Release](https://img.shields.io/github/v/release/C4illin/ConvertX)](https://github.com/C4illin/ConvertX/pkgs/container/convertx)
![GitHub commits since latest release](https://img.shields.io/github/commits-since/C4illin/ConvertX/latest)
![GitHub repo size](https://img.shields.io/github/repo-size/C4illin/ConvertX)
![Docker container size](https://ghcr-badge.egpl.dev/c4illin/convertx/size?color=%230375b6&tag=latest&label=image+size&trim=)

<a href="https://trendshift.io/repositories/13818" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13818" alt="C4illin%2FConvertX | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

A self-hosted online file converter. Supports over a thousand different formats. Written with TypeScript, Bun and Elysia.

## Features

- Convert files to different formats
- Process multiple files at once

## Converters supported

| Converter                                                       | Use case         | Converts from | Converts to |
| --------------------------------------------------------------- | ---------------- | ------------- | ----------- |
| [Inkscape](https://inkscape.org/)                               | Vector images    | 7             | 17          |
| [libjxl](https://github.com/libjxl/libjxl)                      | JPEG XL          | 11            | 11          |
| [resvg](https://github.com/RazrFalcon/resvg)                    | SVG              | 1             | 1           |
| [Vips](https://github.com/libvips/libvips)                      | Images           | 45            | 23          |
| [libheif](https://github.com/strukturag/libheif)                | HEIF             | 2             | 4           |
| [XeLaTeX](https://tug.org/xetex/)                               | LaTeX            | 1             | 1           |
| [Calibre](https://calibre-ebook.com/)                           | E-books          | 26            | 19          |
| [LibreOffice](https://www.libreoffice.org/)                     | Documents        | 41            | 22          |
| [Dasel](https://github.com/TomWright/dasel)                     | Data Files       | 5             | 4           |
| [Pandoc](https://pandoc.org/)                                   | Documents        | 43            | 65          |
| [msgconvert](https://github.com/mvz/email-outlook-message-perl) | Outlook          | 1             | 1           |
| VCF to CSV                                                      | Contacts         | 1             | 1           |
| [dvisvgm](https://dvisvgm.de/)                                  | Vector images    | 4             | 2           |
| [ImageMagick](https://imagemagick.org/)                         | Images           | 245           | 183         |
| [GraphicsMagick](http://www.graphicsmagick.org/)                | Images           | 167           | 130         |
| [Assimp](https://github.com/assimp/assimp)                      | 3D Assets        | 77            | 23          |
| [FFmpeg](https://ffmpeg.org/)                                   | Video            | ~472          | ~199        |
| [Potrace](https://potrace.sourceforge.net/)                     | Raster to vector | 4             | 11          |
| [VTracer](https://github.com/visioncortex/vtracer)              | Raster to vector | 8             | 1           |
| [Markitdown](https://github.com/microsoft/markitdown)           | Documents        | 6             | 1           |

<!-- many ffmpeg fileformats are duplicates -->

Any missing converter? Open an issue or pull request!

## Deployment

```yml
# docker-compose.yml
services:
  convertx:
    image: ghcr.io/c4illin/convertx
    container_name: convertx
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
```

or

```bash
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/c4illin/convertx
```

Then visit `http://localhost:3000` in your browser.

If you get unable to open database file run `chown -R $USER:$USER path` on the path you choose.

### Environment variables

All are optional.

| Name                      | Default | Description                                                                                                                                                   |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTO_DELETE_EVERY_N_HOURS | 24      | Checks every n hours for files older then n hours and deletes them, set to 0 to disable                                                                       |
| WEBROOT                   |         | The address to the root path setting this to "/convert" will serve the website on "example.com/convert/"                                                      |
| FFMPEG_ARGS               |         | Arguments to pass to the input file of ffmpeg, e.g. `-hwaccel vaapi`. See https://github.com/C4illin/ConvertX/issues/190 for more info about hw-acceleration. |
| FFMPEG_OUTPUT_ARGS        |         | Arguments to pass to the output of ffmpeg, e.g. `-preset veryfast`                                                                                            |
| HIDE_HISTORY              | false   | Hide the history page                                                                                                                                         |
| LANGUAGE                  | en      | Language to format date strings in, specified as a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag)                                     |
| MAX_CONVERT_PROCESS       | 0       | Maximum number of concurrent conversion processes allowed. Set to 0 for unlimited.                                                                            |

### Docker images

There is a `:latest` tag that is updated with every release and a `:main` tag that is updated with every push to the main branch. `:latest` is recommended for normal use.

The image is available on [GitHub Container Registry](https://github.com/C4illin/ConvertX/pkgs/container/ConvertX).

| Image                                  | What it is                 |
| -------------------------------------- | -------------------------- |
| `image: ghcr.io/c4illin/convertx`      | The latest release on ghcr |
| `image: ghcr.io/c4illin/convertx:main` | The latest commit on ghcr  |

![Release image size](https://ghcr-badge.egpl.dev/c4illin/convertx/size?color=%230375b6&tag=latest&label=release+image&trim=)

### Tutorial

> [!NOTE]
> These are written by other people, and may be outdated, incorrect or wrong.

Tutorial in french: <https://belginux.com/installer-convertx-avec-docker/>

Tutorial in chinese: <https://xzllll.com/24092901/>

Tutorial in polish: <https://www.kreatywnyprogramista.pl/convertx-lokalny-konwerter-plikow>

## Screenshots

![ConvertX Preview](images/preview.png)

## Development

0. Install [Bun](https://bun.sh/) and Git
1. Clone the repository
2. `bun install`
3. `bun run dev`

Pull requests are welcome! See open issues for the list of todos. The ones tagged with "converter request" are quite easy. Help with docs and cleaning up in issues are also very welcome!

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for commit messages.

## Contributors

<a href="https://github.com/C4illin/ConvertX/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=C4illin/ConvertX" alt="Image with all contributors"/>
</a>

![Alt](https://repobeats.axiom.co/api/embed/dcdabd0564fcdcccbf5680c1bdc2efad54a3d4d9.svg "Repobeats analytics image")

## Star History

<a href="https://github.com/C4illin/ConvertX/stargazers">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=C4illin/ConvertX&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=C4illin/ConvertX&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=C4illin/ConvertX&type=Date" />
 </picture>
</a>
