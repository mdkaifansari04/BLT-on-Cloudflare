#!/usr/bin/env node

/**
 * Build script for BLT-on-Cloudflare
 * Extracts HTML template from Worker and generates static index.html
 */

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'index.js');
const publicPath = path.join(__dirname, '..', 'public');
const htmlPath = path.join(publicPath, 'index.html');

try {
  // Read the Worker source file
  const indexJs = fs.readFileSync(srcPath, 'utf8');
  
  // Extract HTML template
  const match = indexJs.match(/const HTML_TEMPLATE = `([\s\S]*?)`;\s*export default/);
  
  if (!match) {
    throw new Error('Could not extract HTML template from src/index.js');
  }
  
  const htmlContent = match[1];
  
  // Ensure public directory exists
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }
  
  // Write HTML file
  fs.writeFileSync(htmlPath, htmlContent);
  
  console.log('✓ Build successful!');
  console.log(`  Generated: ${htmlPath}`);
  
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}
