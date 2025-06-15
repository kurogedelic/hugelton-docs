# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Hügelton Instruments, containing technical manuals and documentation for hardware synthesizers and music software. The site uses a Markdown-to-HTML build system with professional documentation styling.

## Commands

### Build the documentation
```bash
node md-to-html.js
```

### Deploy to Cloudflare Pages
```bash
wrangler pages deploy public --project-name hugelton-docs
```

### Install dependencies
```bash
npm install
```

## Architecture

The documentation system follows a Markdown-based static generation pattern:

1. **Content Sources**:
   - `manual.md` - Main documentation content in Markdown
   - `assets/` - Images, diagrams, and technical illustrations
   - `src/` - Waveform images and technical graphics

2. **Build System** (`md-to-html.js`):
   - Parses Markdown content using `markdown-it`
   - Generates table of contents with `markdown-it-toc-done-right`
   - Renders mathematical notation with `@iktakahiro/markdown-it-katex`
   - Creates anchor links with `markdown-it-anchor`
   - Outputs to `public/` directory

3. **Styling System**:
   - `manual-styles.css` - Professional documentation styling
   - `fonts/` - Custom Kumochi font for special characters
   - Sidebar navigation with auto-generated TOC
   - Mobile-responsive with hamburger menu

4. **JavaScript Features** (`addiction.js`):
   - Auto-generated table of contents
   - Smooth scrolling navigation
   - Mobile menu functionality
   - Active section highlighting

## Key Files

- `md-to-html.js` - Main build script that converts Markdown to HTML
- `manual.md` - Source Markdown content
- `manual-styles.css` - Documentation-specific styling
- `addiction.js` - TOC generation and navigation functionality
- `fonts/kumochi.css` - Custom font definitions
- `public/` - Generated output directory (deploy target)

## Content Structure

Documentation uses professional academic paper styling with:
- Hierarchical heading structure (H1-H4)
- Mathematical notation support via KaTeX
- Technical diagrams and waveform images
- Responsive tables for specifications
- Code blocks for technical examples

## Styling Features

- **Sidebar Navigation**: Auto-generated from document headings
- **Mathematical Notation**: KaTeX rendering for formulas
- **Mobile Support**: Hamburger menu for small screens
- **Dark Mode**: System preference-based theme switching
- **Typography**: Custom Kumochi font for special characters
- **Academic Styling**: Professional documentation appearance

## Technical Specifications

The build system supports:
- Markdown with frontmatter
- Mathematical expressions in LaTeX syntax
- Image optimization and responsive sizing
- Table of contents generation
- Cross-reference linking
- Mobile-first responsive design

## Development Workflow

1. Edit content in `manual.md`
2. Add images to `assets/` or `src/` directories
3. Run `node md-to-html.js` to build
4. Deploy with `wrangler pages deploy public --project-name hugelton-docs`

## Deployment

The site is deployed on Cloudflare Pages:
- Production: https://documents.hugelton.com
- Staging: https://hugelton-docs.pages.dev
- Preview URLs generated for each deployment