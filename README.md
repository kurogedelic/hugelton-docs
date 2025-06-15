# Hügelton Instruments Documentation

This repository contains technical documentation and manuals for Hügelton Instruments products.

## Build
```bash
npm install
node md-to-html.js
```

## Deploy
```bash
wrangler pages deploy public --project-name hugelton-docs
```

## Development
- Edit markdown files in `/content/`
- Assets in `/assets/`
- Build outputs to `/public/`