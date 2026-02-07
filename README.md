# GitHub Copilot Prompt Templates

A curated collection of GitHub Copilot prompt templates to improve code quality, speed, and consistency across everyday development tasks.

## 🌐 Live Documentation

Visit the documentation site: **https://oneredstar.github.io/github-copilot-prompt-templates/**

## 📚 What's Inside

This repository contains a library of reusable prompt templates for GitHub Copilot, organized by category:

- **Code Review** - Templates for security reviews, performance analysis, and code quality checks
- **Testing** - Templates for generating unit tests, integration tests, and test strategies
- **Documentation** - Templates for creating README files, API docs, and code comments *(coming soon)*

## 🗂️ Repository Structure

```
├── templates/              # Canonical source - EDIT TEMPLATES HERE
│   ├── code-review/       # Code review prompt templates
│   ├── testing/           # Testing prompt templates
│   └── documentation/     # Documentation prompt templates
│
├── website/               # Docusaurus documentation site
│   ├── docs/             # Documentation content
│   │   └── templates/    # Auto-generated from templates/ (DO NOT EDIT)
│   ├── src/              # React components
│   └── static/           # Static assets
│
├── scripts/
│   ├── sync-templates.js    # Syncs templates/ to website/docs/templates/
│   └── verify-templates.js  # CI validation for single source of truth
│
└── .github/
    └── workflows/        # GitHub Actions for automated deployment
```

**⚠️ Important:** `templates/` is the single source of truth. The `website/docs/templates/` directory is automatically generated during build and should never be edited manually.

## 🚀 Quick Start

### Using Templates

1. Browse templates on the [documentation site](https://oneredstar.github.io/github-copilot-prompt-templates/)
2. Find a template that fits your needs
3. Copy the example prompt
4. Customize placeholders with your specific context
5. Use in GitHub Copilot Chat or inline suggestions

### Local Development

Want to run the documentation site locally or contribute?

#### Prerequisites

- [Node.js](https://nodejs.org/) version 20.0 or higher
- npm (comes with Node.js)

#### Installation

```bash
# Clone the repository
git clone https://github.com/oneredstar/github-copilot-prompt-templates.git
cd github-copilot-prompt-templates

# Navigate to the website directory
cd website

# Install dependencies
npm ci
```

#### Development Server

```bash
# Start the development server
# (automatically syncs templates first)
npm run start
```

This opens a browser at `http://localhost:3000`. The site reloads automatically when you make changes. Templates are automatically synced from `templates/` before starting.

#### Build

```bash
# Build the static site
# (automatically syncs templates first)
npm run build
```

This generates static content in the `website/build/` directory, which can be served by any static hosting service. Templates are automatically synced from `templates/` before building.

#### Serve Built Site

```bash
# Serve the built site locally
npm run serve
```

## 🤝 Contributing

We welcome contributions! Here's how to add a new template:

### Quick Contribution Steps

1. **Fork** this repository
2. **Create a branch** for your changes
3. **Add your template**:
   - Create a Markdown file in `templates/<category>/your-template.md`
   - Follow the [template structure guidelines](https://oneredstar.github.io/github-copilot-prompt-templates/docs/contributing)
   - ⚠️ **Do NOT edit files in `website/docs/templates/`** - they are auto-generated
4. **Update sidebar** (if needed):
   - Edit `website/sidebars.ts` to add your template to the navigation
5. **Test locally**:
   - Run `npm run build` in the `website/` directory
   - Templates will be automatically synced and built
   - Verify no errors or broken links
6. **Submit a pull request**

### Template Structure

Each template should include:
- **Title** - Clear, descriptive heading
- **Purpose** - What the template does and when to use it
- **Inputs** - Required information from the user
- **Output** - Expected results from Copilot
- **Example Usage** - Concrete examples
- **Variations** (optional) - Alternative approaches
- **Safety Notes** (optional) - Important considerations

See our [Contributing Guide](https://oneredstar.github.io/github-copilot-prompt-templates/docs/contributing) for detailed instructions.

## 📖 Documentation

- **[Introduction](https://oneredstar.github.io/github-copilot-prompt-templates/docs/intro)** - Overview and quick start
- **[Contributing Guide](https://oneredstar.github.io/github-copilot-prompt-templates/docs/contributing)** - How to add templates
- **[Template Categories](https://oneredstar.github.io/github-copilot-prompt-templates/docs/templates/code-review/security-review)** - Browse all templates

## 🚢 Publishing

The documentation site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment Process

1. Changes merged to `main` trigger the GitHub Actions workflow
2. Workflow builds the Docusaurus site in `website/`
3. Static site is deployed to GitHub Pages
4. Live site updates at https://oneredstar.github.io/github-copilot-prompt-templates/

### Manual Deployment

You can also trigger deployment manually:
1. Go to the **Actions** tab in GitHub
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## 🛠️ Commands Reference

All commands run from the `website/` directory:

| Command | Description |
|---------|-------------|
| `npm ci` | Install dependencies (deterministic, uses lockfile) |
| `npm run start` | Start development server |
| `npm run build` | Build production site |
| `npm run serve` | Serve built site locally |
| `npm run clear` | Clear build cache |
| `npm run typecheck` | Type check TypeScript files |

## 🧑‍💻 For AI Coding Agents

AI agents working on this repository should consult `.github/copilot-instructions.md` for:
- Detailed architecture and structure
- Developer workflows and commands
- Common pitfalls and solutions
- Testing checklist

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

Built with [Docusaurus](https://docusaurus.io/) - a modern static site generator designed for documentation sites.

---

**Happy prompting!** 🚀

