# GitHub Pages Deployment Guide

This document provides step-by-step instructions for deploying the WRXCRATE viewer to GitHub Pages.

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Initial Setup

1. **Enable GitHub Pages in Repository Settings**
   - Navigate to your repository on GitHub
   - Go to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the configuration

2. **Merge This Branch**
   - Once this PR is merged to `main`, the workflow will automatically trigger
   - The site will be deployed to `https://heneni.github.io/WRXCRATE/`

3. **Verify Deployment**
   - Go to the **Actions** tab to monitor the deployment
   - Once complete, visit `https://heneni.github.io/WRXCRATE/` to view your site

### Subsequent Deployments

After the initial setup, any push to the `main` branch will automatically trigger a new deployment.

## Manual Deployment

You can also manually trigger a deployment without pushing new commits:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow from the left sidebar
3. Click the **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

## Files Included in Deployment

The deployment includes all files in the repository:

- `index.html` - Main entry point
- `*.js` - JavaScript modules (cratedigger.js, main.js, etc.)
- `*.css` - Stylesheets
- `data/*.csv` - Record data files
- `bower_components/` - Third-party dependencies
- `image/` and `img/` - Image assets
- `.nojekyll` - Prevents Jekyll processing

## Troubleshooting

### Site Not Deploying

1. Check the **Actions** tab for any workflow errors
2. Ensure GitHub Pages is configured to use **GitHub Actions** as the source
3. Verify that the workflow file exists at `.github/workflows/deploy-pages.yml`

### Site Shows 404

1. Wait a few minutes after deployment - it can take time for GitHub Pages to update
2. Check that the repository settings show the correct Pages URL
3. Verify the deployment succeeded in the Actions tab

### Assets Not Loading

1. Check browser console for CORS or 404 errors
2. Verify that all files are committed and pushed to the repository
3. Ensure file paths in the code use relative paths (not absolute paths)

### CSV Data Not Loading

1. Open browser developer tools and check the Network tab
2. Verify the CSV file is being requested from the correct path
3. Check for CORS issues (should not occur with GitHub Pages)

## Deploying a Specific Commit

If you want to deploy a specific commit (e.g., commit b7558cb):

1. Create a new branch from that commit:
   ```bash
   git checkout -b deploy-specific-commit b7558cbe59b2a5fc0c13445c23b12236f2f5aaf5
   ```

2. Push the branch:
   ```bash
   git push origin deploy-specific-commit
   ```

3. Merge the branch into `main`:
   ```bash
   git checkout main
   git merge deploy-specific-commit
   git push origin main
   ```

4. The GitHub Actions workflow will automatically deploy the changes

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the repository root containing your domain name
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `heneni.github.io`
3. Update the custom domain in GitHub Pages settings

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [About GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
