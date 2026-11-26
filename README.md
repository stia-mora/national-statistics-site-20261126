[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/stia-mora/national-statistics-site-20261126/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/stia-mora/national-statistics-site-20261126/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# Japan in Numbers

**The statistics of Japan, in one place.** An entry for the [make.fun “Make the best national statistics site” bounty](https://make.fun/c/best-national-statistics-site-20261126-0539).

A plain static site — no build step, no network requests, no tracking. Open `app/index.html` from any static server and it works on a desktop and on a phone.

## What it covers

- **Overview** — headline figures, population chart, largest prefectures, latest releases
- **Population** — total, age structure, births and deaths, projections to 2070
- **Economy** — GDP, prices, trade, tourism
- **Labour** — employment, unemployment, hours, pay
- **Health** — life expectancy, hospitals, doctors, spending
- **Education** — PISA scores, enrolment, universities, R&D
- **Environment & Energy** — emissions, the electricity mix, forests
- **Regions** — the ten largest prefectures, sortable and filterable
- **Search** — every one of the 60+ figures, searchable by word, source or year

Every figure names the body that published it and the year it describes. Each section can download its figures as a CSV file.

## How it is built

| File | Job |
| --- | --- |
| `app/index.html` | Page shell: header, navigation, footer |
| `app/style.css` | The whole design |
| `app/data.js` | Every figure, series and table, with source and year |
| `app/charts.js` | Hand-drawn SVG bar, line and donut charts |
| `app/views.js` | Hash router and one renderer per section |
| `app/main.js` | Startup and the CSV download |
| `main.ts` | Hand-in program: copies `app/` and `screenshots/` to `/output` and writes `dossier.json` |

## Run it locally

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
