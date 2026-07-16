// migrate.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom'); // Install with: npm install jsdom

const exportDir = './exported-site'; // Point to your extracted ZIP folder
const outputDir = './src/content/services';

// A simple script to read HTML and extract the <article> or <main> content
function migrate(file) {
    const html = fs.readFileSync(path.join(exportDir, file), 'utf8');
    const dom = new JSDOM(html);
    const content = dom.window.document.querySelector('main').innerHTML; // Adjust selector based on your WP theme
    
    const markdown = `---
/* Version 0.1 | 2026-07-15 | Migrated from WordPress */
title: "${file.replace('.html', '')}"
---
${content}`;

    fs.writeFileSync(path.join(outputDir, file.replace('.html', '.md')), markdown);
}