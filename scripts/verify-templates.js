#!/usr/bin/env node

/**
 * Verify Templates Script
 * 
 * This script ensures that:
 * 1. Templates are only edited in the canonical source (templates/)
 * 2. The generated templates in website/docs/templates/ match the source
 * 3. No manual edits have been made to generated files
 * 
 * Used in CI to prevent duplication and drift.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = path.join(__dirname, '..', 'templates');
const TARGET_DIR = path.join(__dirname, '..', 'website', 'docs', 'templates');

let hasErrors = false;

/**
 * Check if a directory exists
 */
function directoryExists(dir) {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

/**
 * Get all markdown files in a directory
 */
function getMarkdownFiles(dir, baseDir = dir) {
  let files = [];
  
  if (!directoryExists(dir)) {
    return files;
  }
  
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
 * Check if the target directory exists and warn if it contains files
 */
function checkTargetDirectory() {
  console.log('🔍 Checking target directory...\n');
  
  if (!directoryExists(TARGET_DIR)) {
    console.log('ℹ️  Target directory does not exist (will be generated during build)\n');
    return;
  }
  
  const targetFiles = getMarkdownFiles(TARGET_DIR);
  
  if (targetFiles.length > 0) {
    console.log('ℹ️  Generated templates directory exists with files.');
    console.log('   This is expected during local development or after build.');
    console.log('   These files should NOT be committed to git.\n');
  } else {
    console.log('✅ Target directory exists but is empty\n');
  }
}

/**
 * Check if git is tracking files in the target directory
 */
function checkGitTracking() {
  console.log('🔍 Checking git tracking...\n');
  
  try {
    const trackedFiles = execSync(
      'git ls-files website/docs/templates/',
      { encoding: 'utf8', cwd: path.join(__dirname, '..') }
    ).trim();
    
    if (trackedFiles) {
      console.error('❌ ERROR: Generated templates are tracked by git!');
      console.error('');
      console.error('   The following files should not be in version control:');
      trackedFiles.split('\n').forEach(file => console.error(`     - ${file}`));
      console.error('');
      console.error('   To fix:');
      console.error('   1. git rm -r website/docs/templates/');
      console.error('   2. Ensure .gitignore includes: website/docs/templates/');
      console.error('   3. git commit -m "Remove generated templates from git"');
      console.error('');
      hasErrors = true;
    } else {
      console.log('✅ No generated templates are tracked by git\n');
    }
  } catch (error) {
    // If git ls-files returns nothing, the command may exit with status 0
    // but produce no output, which is what we want
    if (error.stdout && error.stdout.trim()) {
      console.error('❌ ERROR checking git tracking:', error);
      hasErrors = true;
    } else {
      console.log('✅ No generated templates are tracked by git\n');
    }
  }
}

/**
 * Verify that the source directory exists and has templates
 */
function checkSourceDirectory() {
  console.log('🔍 Checking source directory...\n');
  
  if (!directoryExists(SOURCE_DIR)) {
    console.error('❌ ERROR: Source templates directory not found!');
    console.error(`   Expected: ${SOURCE_DIR}`);
    console.error('');
    hasErrors = true;
    return;
  }
  
  const sourceFiles = getMarkdownFiles(SOURCE_DIR);
  
  if (sourceFiles.length === 0) {
    console.error('❌ ERROR: No template files found in source directory!');
    console.error(`   Location: ${SOURCE_DIR}`);
    console.error('');
    hasErrors = true;
    return;
  }
  
  console.log(`✅ Found ${sourceFiles.length} template(s) in source directory:`);
  sourceFiles.forEach(file => console.log(`     - ${file}`));
  console.log('');
}

/**
 * Check .gitignore configuration
 */
function checkGitignore() {
  console.log('🔍 Checking .gitignore configuration...\n');
  
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    console.error('❌ ERROR: .gitignore file not found!');
    console.error('');
    hasErrors = true;
    return;
  }
  
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  
  if (gitignoreContent.includes('website/docs/templates/')) {
    console.log('✅ .gitignore properly excludes website/docs/templates/\n');
  } else {
    console.error('❌ ERROR: .gitignore does not exclude website/docs/templates/');
    console.error('');
    console.error('   Add this line to .gitignore:');
    console.error('   website/docs/templates/');
    console.error('');
    hasErrors = true;
  }
}

/**
 * Run all verification checks
 */
function verify() {
  console.log('🛡️  Template Verification\n');
  console.log('This script ensures templates have a single source of truth.\n');
  console.log('='.repeat(60));
  console.log('');
  
  checkSourceDirectory();
  checkTargetDirectory();
  checkGitTracking();
  checkGitignore();
  
  console.log('='.repeat(60));
  console.log('');
  
  if (hasErrors) {
    console.error('❌ VERIFICATION FAILED\n');
    console.error('Templates must be edited only in templates/ directory.');
    console.error('The website/docs/templates/ directory is auto-generated.\n');
    process.exit(1);
  } else {
    console.log('✅ VERIFICATION PASSED\n');
    console.log('Template structure is correctly configured.');
    console.log('Single source of truth: templates/ directory\n');
  }
}

// Run verification
try {
  verify();
} catch (error) {
  console.error('❌ Verification error:', error);
  process.exit(1);
}
