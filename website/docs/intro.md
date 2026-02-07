---
sidebar_position: 1
---

# Introduction

Welcome to the **GitHub Copilot Prompt Templates** library! This is a curated collection of prompt templates designed to help you get the most out of GitHub Copilot for common development tasks.

## What are Prompt Templates?

Prompt templates are pre-written, structured prompts that guide GitHub Copilot to generate high-quality code, documentation, tests, and reviews. By using well-crafted prompts, you can:

- **Save time** - Avoid writing the same prompts repeatedly
- **Improve consistency** - Get predictable, high-quality results
- **Learn best practices** - See how to effectively communicate with AI coding assistants
- **Accelerate development** - Focus on solving problems rather than prompt engineering

## How to Use This Library

1. **Browse the templates** - Explore the Agent Workflows category for prompts that guide Copilot agents through requirements writing and disciplined ticket implementation
2. **Copy and adapt** - Take a template and customize it for your specific needs
3. **Save favorites** - Keep frequently used templates in your own collection
4. **Contribute back** - Share your own effective prompts with the community

## Template Categories

### Agent Workflows
Templates for GitHub Copilot agents to handle complex workflows like requirements writing and disciplined ticket implementation with clear execution rules.

> **Note:** The Agent Workflows category is currently the main category shipped. Older categories like Code Review, Testing, and Documentation have been removed.

## Quick Start

Here's a simple example of using a template:

1. Navigate to [Requirements Writing](/docs/templates/agent-workflows/requirements-writing)
2. Copy the example prompt
3. Replace placeholders with your actual requirements
4. Use it in GitHub Copilot Chat to generate comprehensive tickets

## Repository Structure

- **`templates/`** - Canonical source of all prompt templates (Markdown files). **Edit templates only in this directory.**
- **`website/`** - Docusaurus site for browsing templates
- **`website/docs/templates/`** - Auto-generated documentation pages (never edit manually; always synced from `templates/`)

## Contributing

We welcome contributions! To add a new template:

1. Create a Markdown file in the appropriate `templates/` category (e.g., `templates/agent-workflows/`)
2. Follow the [template structure guidelines](/docs/contributing)
3. Submit a pull request

> **Important:** Never edit files in `website/docs/templates/` directly. These are auto-generated from `templates/` during the build process.

See the [Contributing Guide](/docs/contributing) for detailed instructions.

## About This Project

This project aims to build a comprehensive, community-driven library of effective GitHub Copilot prompts. Whether you're new to AI-assisted coding or an experienced practitioner, we hope these templates accelerate your development workflow.

