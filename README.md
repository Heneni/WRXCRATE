# WRX Crate viewer

This repository contains the static Three.js viewer for the WRX record crate. The page loads `data/records.csv` at runtime, so it must be served over HTTP(S) from the same directory (for example via your existing static hosting or CDN).

## What you need to do

1. Merge this branch into the branch that your static host publishes (usually `main`).
2. Push the updated branch so your host/CDN redeploys the static files.
3. Once the deploy finishes, open the hosted URL. The viewer will fetch `data/records.csv` and display the covers on both faces.

No extra local steps are required unless you want to test the viewer on your machine.

## Optional: refresh the data locally

If you need to verify changes before pushing live, you can serve the folder locally:

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
* **CSV failed to load?** Make sure you are serving the site over HTTP(S); browsers block `fetch()` calls when the page is opened directly from the filesystem.

## Tests

The repository has a small smoke-test harness. You can run it with:

```bash
npm test
```
