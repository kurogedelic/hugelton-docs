# Hügelton Instruments Documentation

This repository contains technical documentation and manuals for Hügelton Instruments products.

## Structure

- `index.md` - Product listing page
- `K102E/` - K102E Digital Compound Oscillator documentation
- `template/` - HTML templates for documentation pages
- `assets/` - Images and resources
- `public/` - Generated static site (deploy target)

## Build

```bash
npm install
npm run build
```

## Deploy

The site automatically deploys to Cloudflare Pages via GitHub Actions when changes are pushed to main.

Manual deployment:
```bash
wrangler pages deploy public --project-name hugelton-docs
```

## Development

- Edit content in product directories (e.g., `K102E/index.md`)
- Add new products by creating directories and updating the build script
- Templates are in `template/` directory
- Build outputs to `public/` directory
