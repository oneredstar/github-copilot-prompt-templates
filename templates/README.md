# Prompt Templates

This directory contains the canonical source of all GitHub Copilot prompt templates for this library.

## Organization

Templates are organized by category in subdirectories:

- `code-review/` - Templates for code review and quality assurance tasks
- `testing/` - Templates for test creation and testing workflows
- `documentation/` - Templates for documentation generation and updates

## Template Structure

Each template should follow this standard format:

### File Naming
- Use lowercase kebab-case: `template-name.md`
- Be descriptive but concise

### Content Structure
Each template Markdown file should include:

1. **Title** - Clear, descriptive heading
2. **Purpose** - Brief description of what the template does and when to use it
3. **Inputs** - Required information or context the user must provide
4. **Output** - What to expect from Copilot when using this template
5. **Example Usage** - A concrete example demonstrating the template in action
6. **Variations** (optional) - Alternative approaches or modifications
7. **Safety Notes** (optional) - Warnings or considerations for using this template

## Adding a New Template

1. Choose the appropriate category directory (or create a new one if needed)
2. Create a new `.md` file following the naming convention
3. Use the structure outlined above
4. Update the website documentation to surface the new template (see `website/docs/templates/`)
5. Update the sidebar configuration if adding a new category (see `website/sidebars.js`)

## Categories

### Code Review
Templates that help with reviewing code, identifying issues, and suggesting improvements.

### Testing
Templates for generating tests, test cases, and testing strategies.

### Documentation
Templates for creating or updating documentation, README files, and code comments.
