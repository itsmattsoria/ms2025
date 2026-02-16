import type { AstroIntegration } from 'astro';
import { SHORTCODE_MAP } from '../utils/shortcodeReplacer.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Creates an image tag for a shortcode
 */
function createImageTag(shortcode: string, imagePath: string, alt: string): string {
  return `<img src="${imagePath}" alt="${alt}" class="custom-emoji" />`;
}

/**
 * Replaces shortcodes in HTML while preserving code blocks and scripts
 */
export function processHTML(html: string): string {
  // Split HTML into segments to avoid replacing inside sensitive tags
  // Order matters: outer tags (pre) must come before inner tags (code)
  // so nested structures are captured as a single unit
  const protectedTags = ['pre', 'script', 'style', 'code'];
  
  // Create a map to store protected content
  const protectedContent: Map<string, string> = new Map();
  let placeholderIndex = 0;
  
  // Protect content inside sensitive tags and HTML comments
  let processedHTML = html;
  
  // Protect HTML comments
  processedHTML = processedHTML.replace(/<!--[\s\S]*?-->/g, (match) => {
    const placeholder = `___PROTECTED_COMMENT_${placeholderIndex++}___`;
    protectedContent.set(placeholder, match);
    return placeholder;
  });
  
  // Protect sensitive tags
  for (const tag of protectedTags) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
    processedHTML = processedHTML.replace(regex, (match) => {
      const placeholder = `___PROTECTED_${tag.toUpperCase()}_${placeholderIndex++}___`;
      protectedContent.set(placeholder, match);
      return placeholder;
    });
  }
  
  // Now replace shortcodes in the remaining HTML
  for (const config of SHORTCODE_MAP) {
    const imageTag = createImageTag(config.shortcode, config.imagePath, config.alt);
    processedHTML = processedHTML.replaceAll(config.shortcode, imageTag);
  }
  
  // Restore protected content (use function replacement to avoid
  // interpreting $ characters in code as special replacement patterns)
  for (const [placeholder, content] of protectedContent) {
    processedHTML = processedHTML.replace(placeholder, () => content);
  }
  
  return processedHTML;
}

/**
 * Recursively process all HTML files in a directory
 */
async function processDirectory(dir: string): Promise<void> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = await fs.promises.readFile(fullPath, 'utf-8');
      const processed = processHTML(content);
      
      if (content !== processed) {
        await fs.promises.writeFile(fullPath, processed, 'utf-8');
      }
    }
  }
}

export default function shortcodeReplacerIntegration(): AstroIntegration {
  return {
    name: 'shortcode-replacer',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        // Process all HTML files after build
        const distPath = fileURLToPath(dir);
        console.log('Processing shortcodes in build output...');
        await processDirectory(distPath);
        console.log('Shortcode processing complete.');
      }
    }
  };
}
