import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'GitHub Copilot Prompt Templates',
  tagline: 'A curated collection of GitHub Copilot prompt templates to improve code quality, speed, and consistency',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://oneredstar.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/github-copilot-prompt-templates/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'oneredstar', // Usually your GitHub org/user name.
  projectName: 'github-copilot-prompt-templates', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/oneredstar/github-copilot-prompt-templates/tree/main/website/',
        },
        blog: false, // Disable blog for this project
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Copilot Prompts',
      logo: {
        alt: 'Copilot Prompt Templates Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Templates',
        },
        {
          href: 'https://github.com/oneredstar/github-copilot-prompt-templates',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Templates',
          items: [
            {
              label: 'Security Review',
              to: '/docs/templates/code-review/security-review',
            },
            {
              label: 'Performance Review',
              to: '/docs/templates/code-review/performance-review',
            },
            {
              label: 'Unit Test Generation',
              to: '/docs/templates/testing/unit-test-generation',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/oneredstar/github-copilot-prompt-templates',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GitHub Copilot Prompt Templates. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
