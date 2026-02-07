#!/usr/bin/env node

/**
 * Sync Templates Script
 * 
 * This script synchronizes templates from the canonical source (templates/)
 * to the Docusaurus docs location (website/docs/templates/).
 * 
 * It adds necessary front matter and links back to the canonical source
 * while keeping the content in sync.
 * 
 * This ensures contributors only edit templates in one place.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'templates');
const TARGET_DIR = path.join(__dirname, '..', 'website', 'docs', 'templates');

const CATEGORY_SIDEBAR_POSITIONS = {
  'requirements-writing.md': 1,
  'ticket-assignment.md': 2,
};

/**
 * Recursively get all markdown files in a directory
 */
function getMarkdownFiles(dir, baseDir = dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') && item !== 'README.md') {
      files.push(path.relative(baseDir, fullPath));
    }
  }
  
  return files;
}

/**
 * Add front matter and canonical source link to template content
 */
function processTemplateContent(content, relativePath, filename) {
  const lines = content.split('\n');
  
  // Extract the title (first H1)
  let titleLine = lines.findIndex(line => line.startsWith('# '));
  if (titleLine === -1) {
    console.warn(`Warning: No H1 title found in ${relativePath}`);
    titleLine = 0;
  }
  
  // Build front matter
  const frontMatter = [];
  frontMatter.push('---');
  
  const sidebarPosition = CATEGORY_SIDEBAR_POSITIONS[filename];
  if (sidebarPosition) {
    frontMatter.push(`sidebar_position: ${sidebarPosition}`);
  }
  
  frontMatter.push('---');
  frontMatter.push('');
  
  // Add canonical source link after the first heading
  const githubPath = `templates/${relativePath}`;
  const canonicalLink = `\n**Canonical source:** [${githubPath}](https://github.com/oneredstar/github-copilot-prompt-templates/blob/main/${githubPath})\n`;
  
  // Insert front matter at the beginning
  const contentWithFrontMatter = frontMatter.join('\n') + content;
  
  // Insert canonical link after the first H1
  const linesWithFrontMatter = contentWithFrontMatter.split('\n');
  const newTitleLine = titleLine + frontMatter.length;
  
  // Find the position to insert the canonical link (after title and any immediately following content)
  let insertPosition = newTitleLine + 1;
  
  // Skip any blank lines after the title
  while (insertPosition < linesWithFrontMatter.length && linesWithFrontMatter[insertPosition].trim() === '') {
    insertPosition++;
  }
  
  // Skip the next paragraph if it exists (this is typically the "Purpose" or description)
  if (insertPosition < linesWithFrontMatter.length && !linesWithFrontMatter[insertPosition].startsWith('#')) {
    // Find the next blank line or heading
    while (insertPosition < linesWithFrontMatter.length && 
           linesWithFrontMatter[insertPosition].trim() !== '' && 
           !linesWithFrontMatter[insertPosition].startsWith('#')) {
      insertPosition++;
    }
  }
  
  linesWithFrontMatter.splice(insertPosition, 0, ...canonicalLink.split('\n'));
  
  return linesWithFrontMatter.join('\n');
}

/**
 * Sync templates from source to target
 */
function syncTemplates() {
  console.log('🔄 Syncing templates from templates/ to website/docs/templates/...\n');
  
  // Ensure target directory exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }
  
  // Get all template files from source
  const templateFiles = getMarkdownFiles(SOURCE_DIR);
  
  if (templateFiles.length === 0) {
    console.warn('⚠️  No template files found in templates/');
    return;
  }
  
  console.log(`Found ${templateFiles.length} template(s) to sync:\n`);
  
  let syncedCount = 0;
  
  for (const relativePath of templateFiles) {
    const sourcePath = path.join(SOURCE_DIR, relativePath);
    const targetPath = path.join(TARGET_DIR, relativePath);
    const filename = path.basename(relativePath);
    
    // Ensure target subdirectory exists
    const targetSubDir = path.dirname(targetPath);
    if (!fs.existsSync(targetSubDir)) {
      fs.mkdirSync(targetSubDir, { recursive: true });
    }
    
    // Read source content
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Process content (add front matter and canonical link)
    const processedContent = processTemplateContent(sourceContent, relativePath, filename);
    
    // Write to target
    fs.writeFileSync(targetPath, processedContent, 'utf8');
    
    console.log(`  ✅ ${relativePath}`);
    syncedCount++;
  }
  
  console.log(`\n✨ Successfully synced ${syncedCount} template(s)!\n`);
  
  // Clean up any files in target that don't exist in source
  cleanupOrphanedFiles(TARGET_DIR, templateFiles);
}

/**
 * Remove files from target that don't exist in source
 */
function cleanupOrphanedFiles(targetDir, validFiles) {
  const targetFiles = getMarkdownFiles(targetDir);
  const orphanedFiles = targetFiles.filter(file => !validFiles.includes(file));
  
  if (orphanedFiles.length > 0) {
    console.log('🧹 Cleaning up orphaned files:\n');
    
    for (const file of orphanedFiles) {
      const filePath = path.join(targetDir, file);
      fs.unlinkSync(filePath);
      console.log(`  🗑️  Removed ${file}`);
    }
    
    console.log('');
  }
  
  // Clean up empty directories
  cleanupEmptyDirectories(targetDir);
}

/**
 * Recursively remove empty directories
 */
function cleanupEmptyDirectories(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      cleanupEmptyDirectories(fullPath);
      
      // Check if directory is now empty
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
    }
  }
}

// Run the sync
try {
  syncTemplates();
} catch (error) {
  console.error('❌ Error syncing templates:', error);
  process.exit(1);
}
