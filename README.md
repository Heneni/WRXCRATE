# WRX Crate viewer

This repository contains the static Three.js viewer for the WRX record crate. It is not deployed anywhere automatically, so nothing changes "live" when commits land — you must run it locally to see the latest code.

## How to run it locally

1. Make sure you have a recent version of Node.js installed (v18 or newer works).
2. From the project directory, start the bundled static web server:
   ```bash
   npm start
   ```
   This launches a lightweight HTTP server at [http://localhost:8080](http://localhost:8080).
3. Open that URL in your browser. The page fetches `data/records.csv`, builds the record list, and then streams the artwork onto the viewer. You will see errors if the page is opened directly from the filesystem because browsers block CSV fetches in that context.

### Optional: choose a different port

If port 8080 is already in use, you can pick another port:

```bash
npm start -- 3000
```

Then browse to `http://localhost:3000` instead.

## Troubleshooting

* **Images still not showing?** The CSV points at cover art hosted on third-party CDNs. Some of those hosts (for example Google Cloud Storage) refuse hotlinked requests, so the browser console will log `403 Forbidden` responses for specific records. The viewer keeps working, but those individual sleeves remain blank because the remote server denied the download.
* **CSV failed to load?** Double-check that you are using the `npm start` server (or any other static HTTP server) rather than opening `index.html` via the `file://` protocol. The bundled server prints the URL to visit after it starts.

## Tests

The repository has a small smoke-test harness. You can run it with:

```bash
npm test
```
