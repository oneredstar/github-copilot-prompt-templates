# GitHub Copilot Instructions for Prompt Templates Repository

This file contains essential knowledge for AI coding agents working on this repository.

## Repository Architecture

### Big Picture
This repository maintains a library of GitHub Copilot prompt templates with automated build:
1. **Canonical templates** in `templates/` - The single source of truth for all prompt templates
2. **Documentation site** in `website/` - A Docusaurus-based browsable website
3. **Automated sync** - Templates are automatically copied to `website/docs/templates/` during build

**⚠️ Critical:** `templates/` is the ONLY location where templates should be edited. The `website/docs/templates/` directory is automatically generated and must never be manually edited.

### Directory Structure

```
/
├── templates/                    # Canonical template sources - EDIT HERE ONLY
│   ├── README.md                # Organization and structure guide
│   ├── code-review/             # Code review templates
│   ├── testing/                 # Testing templates
│   └── documentation/           # Documentation templates
│
├── scripts/
│   ├── sync-templates.js        # Auto-syncs templates/ to website/docs/templates/
│   └── verify-templates.js      # CI validation for single source of truth
│
├── website/                      # Docusaurus documentation site
│   ├── docs/                    # Documentation content
│   │   ├── intro.md            # Landing page
│   │   ├── contributing.md     # Contribution guide
│   │   └── templates/          # AUTO-GENERATED - DO NOT EDIT MANUALLY
│   │       ├── code-review/
│   │       └── testing/
│   ├── src/                     # React components and pages
│   ├── static/                  # Static assets
│   ├── docusaurus.config.ts    # Main configuration
│   ├── sidebars.ts             # Sidebar navigation structure
│   └── package.json            # Dependencies
│
└── .github/
    └── workflows/
        └── deploy-pages.yml     # GitHub Pages deployment
```

### Content Relationship
- `templates/` contains the canonical source files (SINGLE SOURCE OF TRUTH)
- `website/docs/templates/` is automatically generated from `templates/` during build
- The sync script (`scripts/sync-templates.js`) adds front matter and canonical links
- Contributors must NEVER edit files in `website/docs/templates/` directly
- The directory `website/docs/templates/` is gitignored and regenerated on every build

## Developer Workflows

### Local Development Commands

All commands run from the `website/` directory:

```bash
# Install dependencies (use lockfile for deterministic builds)
npm ci

# Start local dev server (http://localhost:3000)
npm run start

# Build static site for production
npm run build

# Serve built site locally
npm run serve

# Type check TypeScript
npm run typecheck

# Clear cache (if needed)
npm run clear
```

### Adding a New Template

1. **Create canonical template** in `templates/<category>/template-name.md`
   - Follow standard template structure (see `templates/README.md`)
   - Use lowercase kebab-case for filenames
   - ⚠️ **Do NOT create files in `website/docs/templates/`** - they are auto-generated

2. **Update sidebar** in `website/sidebars.ts`
   - Add new template to appropriate category
   - Create new category if needed

3. **Configure front matter** (optional) in `scripts/sync-templates.js`
   - Add sidebar position if needed in `CATEGORY_SIDEBAR_POSITIONS` object

4. **Test locally**
   - Run `npm run start` to verify rendering (auto-syncs templates)
   - Run `npm run build` to check for errors (auto-syncs templates)
   - Verify links and navigation work

### Adding a New Category

1. Create directory in `templates/<new-category>/`
2. Add category to `website/sidebars.ts`:
   ```typescript
   {
     type: 'category',
     label: 'New Category',
     items: ['templates/new-category/template-name'],
   }
   ```
3. Update footer links in `website/docusaurus.config.ts` if desired

Note: The `website/docs/templates/<new-category>/` directory will be automatically created during build.

## Configuration Files

### Docusaurus Config (`website/docusaurus.config.ts`)
Key settings:
- `url`: Production URL (`https://oneredstar.github.io`)
- `baseUrl`: Path on server (`/github-copilot-prompt-templates/`)
- `organizationName`: GitHub org (`oneredstar`)
- `projectName`: Repo name (`github-copilot-prompt-templates`)
- `onBrokenLinks`: Set to `'throw'` to catch broken links during build

### Sidebars (`website/sidebars.ts`)
- Manually defined structure for better control
- Items reference doc paths without `.md` extension
- Categories can be nested and have custom labels

## Conventions

### Naming Conventions

**Template files:**
- Use lowercase kebab-case: `security-review.md`
- Be descriptive but concise
- Match category themes

**Categories:**
- Use lowercase kebab-case directory names
- Use Title Case for sidebar labels
- Keep names short and clear

### Template Structure

Every template must include:
1. **Title** (H1)
2. **Purpose** - What it does and when to use it
3. **Inputs** - Required information from user
4. **Output** - What Copilot provides
5. **Example Usage** - Concrete example with code blocks
6. **Variations** (optional) - Alternative approaches
7. **Safety Notes** (optional) - Warnings or considerations

### Front Matter

Documentation pages can use front matter:
```markdown
---
sidebar_position: 1
title: Optional Custom Title
---
```

Position numbers control order within a category (lower = higher).

## Integration Points

### GitHub Pages Workflow

**File:** `.github/workflows/deploy-pages.yml`

**Behavior:**
- Triggers on push to `main` branch
- Can be manually triggered via workflow_dispatch
- Uses modern GitHub Pages Actions (upload artifact + deploy)
- Build runs in `website/` directory
- Uploads `website/build/` as artifact
- Deploys artifact to GitHub Pages

**Permissions Required:**
- `contents: read` - Read repo
- `pages: write` - Write to Pages
- `id-token: write` - OIDC authentication

**Repository Settings Required:**
In repository settings → Pages:
- Source: GitHub Actions (not legacy branch-based deployment)

### Build Process

1. Checkout code
2. Setup Node.js 20 with npm cache
3. Verify template structure (no manual edits to generated files)
4. Install deps with `npm ci` in `website/`
5. Sync templates from `templates/` to `website/docs/templates/` (automatic via prebuild)
6. Build with `npm run build` in `website/`
7. Upload `website/build/` directory
8. Deploy to Pages

## Common Pitfalls

### Base URL Issues
**Problem:** Links or assets don't work on GitHub Pages but work locally

**Cause:** `baseUrl` in `docusaurus.config.ts` must match the repository name

**Solution:**
- Local: `baseUrl: '/'` works
- GitHub Pages: `baseUrl: '/github-copilot-prompt-templates/'` required
- Config already set correctly, don't change it

### Sidebar Configuration Errors
**Problem:** Template doesn't appear in sidebar

**Causes:**
- Path in `sidebars.ts` doesn't match actual file location
- File path includes `.md` extension (should be omitted)
- Missing document at specified path

**Solution:**
- Verify file exists at `website/docs/<path>.md`
- Check path in sidebar is `'templates/category/name'` not `'templates/category/name.md'`
- Run build to see specific error

### Broken Links
**Problem:** Build fails with broken link errors

**Causes:**
- Internal links to non-existent pages
- Incorrect relative paths
- Missing pages

**Solution:**
- Use relative paths: `/docs/intro` for absolute, `../other` for relative
- Docusaurus validates all links at build time (`onBrokenLinks: 'throw'`)
- Check build output for specific broken link reports

### Content Sync Drift
**Problem:** Templates are not being automatically synced

**This is no longer a problem!** Templates are automatically synced from `templates/` to `website/docs/templates/` during build via prebuild hooks in `package.json`. The sync script (`scripts/sync-templates.js`) handles this automatically.

### Node/npm Version Mismatch
**Problem:** Build works locally but fails in CI

**Cause:** Different Node versions

**Solution:**
- Workflow specifies Node 20
- Use same version locally: `node -v` to check
- Use `nvm` or similar to switch: `nvm use 20`

### Cache Issues
**Problem:** Changes not reflected after rebuild

**Solution:**
- Clear Docusaurus cache: `npm run clear` in `website/`
- Delete `website/.docusaurus/` and `website/build/`
- Restart dev server

## Build Output

### Gitignore Settings
Build artifacts are ignored:
- `node_modules/` - Dependencies
- `.docusaurus/` - Build cache
- `website/build/` - Production build output
- `website/docs/templates/` - Generated templates

Never commit these to version control.

## Testing Checklist

Before submitting PR with template changes:

- [ ] Canonical template created/updated in `templates/`
- [ ] Sidebar updated in `website/sidebars.ts` if needed
- [ ] Run `npm ci` in `website/` - succeeds
- [ ] Run `npm run start` in `website/` - site loads, template appears
- [ ] Run `npm run build` in `website/` - build succeeds, no warnings
- [ ] Check for broken links in build output
- [ ] Navigate to new template in browser - renders correctly
- [ ] All links work (test by clicking)
- [ ] Code blocks have proper syntax highlighting

## Quick Reference

**Add template:** Create in `templates/`, update `website/sidebars.ts`

**Build site:** `cd website && npm run build`

**Dev server:** `cd website && npm run start`

**Fix broken links:** Check paths in Markdown, ensure targets exist

**Deploy:** Push to `main`, GitHub Actions handles rest

**Base URL:** `/github-copilot-prompt-templates/` for Pages, `/` for local

**Source of truth:** `templates/` directory (canonical), `website/docs/templates/` (display)
