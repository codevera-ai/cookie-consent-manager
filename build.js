#!/usr/bin/env node

/**
 * Build script for js-cookie-consent
 * Minifies JavaScript and CSS files
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building js-cookie-consent...\n');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log('✓ Created dist directory');
}

// Minify JavaScript
console.log('→ Minifying JavaScript...');
try {
    execSync('npx terser src/ccmanager.js -c -m --comments false -o dist/ccmanager.min.js', { stdio: 'inherit' });
    console.log('✓ JavaScript minified');
} catch (error) {
    console.error('✗ Failed to minify JavaScript');
    process.exit(1);
}

// Minify CSS
console.log('→ Minifying CSS...');
try {
    execSync('npx cleancss -o dist/ccmanager.min.css src/ccmanager.css', { stdio: 'inherit' });
    console.log('✓ CSS minified');
} catch (error) {
    console.error('✗ Failed to minify CSS');
    process.exit(1);
}

// Copy unminified files to dist
console.log('→ Copying source files...');
fs.copyFileSync('src/ccmanager.js', 'dist/ccmanager.js');
fs.copyFileSync('src/ccmanager.css', 'dist/ccmanager.css');
console.log('✓ Source files copied');

// Get file sizes
const jsMinSize = fs.statSync('dist/ccmanager.min.js').size;
const cssMinSize = fs.statSync('dist/ccmanager.min.css').size;
const totalSize = jsMinSize + cssMinSize;

console.log('\n=== Build complete ===');
console.log(`JavaScript (minified): ${(jsMinSize / 1024).toFixed(2)} KB`);
console.log(`CSS (minified): ${(cssMinSize / 1024).toFixed(2)} KB`);
console.log(`Total (minified): ${(totalSize / 1024).toFixed(2)} KB`);
console.log('======================\n');
