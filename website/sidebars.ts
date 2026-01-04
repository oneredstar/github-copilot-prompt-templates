import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manually defined sidebar structure for better organization
  tutorialSidebar: [
    'intro',
    'contributing',
    {
      type: 'category',
      label: 'Code Review',
      items: [
        'templates/code-review/security-review',
        'templates/code-review/performance-review',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        'templates/testing/unit-test-generation',
      ],
    },
  ],
};

export default sidebars;
