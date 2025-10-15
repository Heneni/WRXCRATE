# WRX Crate viewer

This repository contains the static Three.js viewer for the WRX record crate. The viewer ships with an embedded snapshot of the CSV data, so you can simply open `index.html` in any modern browser and it will work without running a local server or installing dependencies.

## Optional: refresh the data locally

Opening the page directly uses the bundled CSV snapshot. If you want to load a freshly exported `data/records.csv` instead, you can serve the folder locally:

1. Make sure you have a recent version of Node.js installed (v18 or newer works).
2. From the project directory, start the bundled static web server:
   ```bash
   npm start
   ```
   This launches a lightweight HTTP server at [http://localhost:8080](http://localhost:8080).
3. Open that URL in your browser to pull the CSV over HTTP.

### Optional: choose a different port

If port 8080 is already in use, you can pick another port:

```bash
npm start -- 3000
```

Then browse to `http://localhost:3000` instead.

## Troubleshooting

* **Images still not showing?** The CSV points at cover art hosted on third-party CDNs. Some of those hosts (for example Google Cloud Storage) refuse hotlinked requests, so the browser console will log `403 Forbidden` responses for specific records. The viewer keeps working, but those individual sleeves remain blank because the remote server denied the download.
* **CSV failed to load?** When opened directly from the filesystem the app now falls back to the bundled snapshot. If you prefer to fetch `data/records.csv` live and see an error, confirm that you started the local server described above.

## Tests

The repository has a small smoke-test harness. You can run it with:

```bash
npm test
```
