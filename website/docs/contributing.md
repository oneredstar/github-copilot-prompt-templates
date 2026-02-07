---
sidebar_position: 2
---

# Contributing Guide

Thank you for your interest in contributing to the GitHub Copilot Prompt Templates library! This guide will help you add new templates or improve existing ones.

## Quick Contribution Steps

1. Fork the repository
2. Create a new branch for your changes
3. Add or update templates in the `templates/` directory
4. Update the sidebar configuration if needed
5. Test your changes locally
6. Submit a pull request

**⚠️ Important:** Templates should only be edited in the `templates/` directory. The `website/docs/templates/` directory is automatically generated during build and should never be edited manually.

## Adding a New Template

### 1. Choose a Category

Templates are organized by category. Current categories include:

- **code-review** - Code quality, security, and performance reviews
- **testing** - Test generation and testing strategies
- **documentation** - Documentation creation and updates (coming soon)

If your template doesn't fit existing categories, you can propose a new one.

### 2. Create the Template File

Create a new Markdown file in `templates/<category>/`:

```
templates/
  code-review/
    security-review.md
    performance-review.md
    your-new-template.md  ← Add here
```

**Naming Convention:** Use lowercase kebab-case (e.g., `api-error-handling.md`)

**⚠️ Important:** Only edit templates in the `templates/` directory. The `website/docs/templates/` directory is automatically generated and should never be edited manually.

### 3. Follow the Template Structure

Each template should contain a **copy-paste ready prompt** that users can directly use with AI agents. The template should include:

1. **Title and Purpose** - Clear description of what the prompt does
2. **When to Use** - Specific use cases
3. **The Prompt** - A complete, generic prompt in a code block that can be copied and customized
4. **Customization Instructions** - How to replace placeholders with actual values
5. **Example** (optional) - Concrete before/after example
6. **Variations** (optional) - Alternative versions for different scenarios

#### Generic Template Structure

````markdown
# [Template Name]

## Purpose
[Brief description of what this prompt does and when to use it]

**When to use:** [Specific use case description]

## The Prompt

Copy this prompt and replace the placeholders with your specific details:

```
[GENERIC PROMPT CONTENT HERE]

Replace these placeholders:
- [PLACEHOLDER_1]: Description of what to put here
- [PLACEHOLDER_2]: Description of what to put here
- [CUSTOM_INPUT_SECTION]: Your specific requirements/details go here
```

## Example Usage

### Before (Your Input)
```
[Example of what you would provide]
```

### After (Final Prompt)
```
[Example of the customized prompt ready to use]
```

## Variations (optional)

### [Variation Name]
```
[Alternative prompt for specific scenario]
```

## Safety Notes (optional)
- [Important warnings or considerations]
````

### 4. Add Documentation Page

**Skip this step!** The documentation pages are automatically generated from the `templates/` directory during the build process.

If you want to customize the sidebar position or front matter for your template, you can configure it in the sync script at `scripts/sync-templates.js`.

### 5. Update Sidebar Configuration

If you're adding a new category, update `website/sidebars.ts`:

```typescript
const sidebars = {
  tutorialSidebar: [
    'intro',
    'contributing',
    {
      type: 'category',
      label: 'Code Review',
      items: ['templates/code-review/security-review', ...],
    },
    {
      type: 'category',
      label: 'Your New Category',  // Add new category here
      items: ['templates/your-category/template-name'],
    },
  ],
};
```

## Testing Your Changes

Before submitting a pull request, test your changes locally:

### Install Dependencies

```bash
cd website
npm ci
```

### Start Development Server

```bash
npm run start
```

This will automatically sync templates from `templates/` to `website/docs/templates/` and start the development server.

Visit `http://localhost:3000` and verify:
- Your template appears in the sidebar
- Links work correctly
- Formatting looks good
- No broken links or images

### Build the Site

```bash
npm run build
```

This will automatically sync templates and build the site. Ensure the build completes without errors.

## Style Guidelines

### Writing Style

- **Be clear and concise** - Users should understand quickly
- **Use examples** - Show, don't just tell
- **Be specific** - Include concrete prompts, not abstract descriptions
- **Consider safety** - Mention limitations or risks where appropriate

### Markdown Formatting

- Use proper heading hierarchy (H1 → H2 → H3)
- Use code blocks with language identifiers
- Use bullet points for lists
- Use **bold** for emphasis, *italic* sparingly

### Prompt Quality

Good prompts are:
- **Specific** - Clear about what you want
- **Contextual** - Provide necessary background
- **Actionable** - Copilot can act on them directly
- **Safe** - Don't encourage anti-patterns

## Pull Request Guidelines

### PR Title

Use a clear, descriptive title:
- ✅ "Add API documentation generation template"
- ✅ "Fix broken links in security review template"
- ❌ "Update files"
- ❌ "Changes"

### PR Description

Include:
- **What** - What template(s) you added or changed
- **Why** - Why this template is useful
- **Testing** - How you verified it works
- **Category** - Which category it belongs to

### Checklist

Before submitting, ensure:
- [ ] Template follows the standard structure
- [ ] Template is in the `templates/` directory (NOT in `website/docs/templates/`)
- [ ] Sidebar updated in `website/sidebars.ts` if needed
- [ ] Local build succeeds (`npm run build`)
- [ ] No broken links
- [ ] Examples are clear and practical
- [ ] Spelling and grammar checked

## Getting Help

If you have questions:

1. Check existing templates for examples
2. Review this contributing guide
3. Open a GitHub issue for discussion
4. Refer to `.github/copilot-instructions.md` for technical details

## Code of Conduct

Please be respectful and constructive. We're building this library together to help the community.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).
