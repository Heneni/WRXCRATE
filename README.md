# WRX Crate viewer

This repository contains the static Three.js viewer for the WRX record crate. The page loads `data/records.csv` at runtime, so it must be served over HTTP(S) from the same directory (for example via your existing static hosting or CDN).

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages. When changes are merged to the `main` branch, the GitHub Actions workflow will automatically deploy the site to `https://heneni.github.io/WRXCRATE/`.

### Setup GitHub Pages (One-time)

To enable GitHub Pages for this repository:

1. Navigate to **Settings > Pages** in the GitHub repository
2. Under **Source**, select **GitHub Actions**
3. The site will automatically deploy when changes are pushed to the `main` branch

Once configured, the site will be accessible at: `https://heneni.github.io/WRXCRATE/`

### Manual Deployment

You can also manually trigger a deployment:

1. Go to the **Actions** tab in GitHub
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow** and select the `main` branch

## What you need to do

1. Open a pull request with these changes (or fast-forward the branch if you prefer).
2. Merge the changes into the branch that your static host publishes (usually `main`).
3. Push the updated branch so your host/CDN redeploys the static files.
4. Wait for the deploy to finish, then open the hosted URL. The viewer will fetch `data/records.csv` from the same server and display the covers on both faces.

> **You do not need to run anything locally unless you choose to test first.** Once the branch is merged and pushed, your existing hosting setup will pick up the new files automatically.
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
