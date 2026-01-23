/**
 * Replaces emoji shortcodes with inline image tags at build time
 */

export interface ShortcodeConfig {
  shortcode: string;
  imagePath: string;
  alt: string;
}

// Define shortcode mappings
export const SHORTCODE_MAP: ShortcodeConfig[] = [
  {
    shortcode: ':horns:',
    imagePath: '/images/emoji/horns.png',
    alt: 'horns emoji',
  },
  {
    shortcode: ':heart:',
    imagePath: '/images/emoji/heart.png',
    alt: 'heart emoji',
  },
  {
    shortcode: ':wave:',
    imagePath: '/images/emoji/wave.png',
    alt: 'wave emoji',
  },
  {
    shortcode: ':sunglasses:',
    imagePath: '/images/emoji/sunglasses.png',
    alt: 'sunglasses emoji',
  },
  {
    shortcode: ':peace:',
    imagePath: '/images/emoji/peace.png',
    alt: 'peace emoji',
  },
  {
    shortcode: ':sparkles:',
    imagePath: '/images/emoji/sparkles.png',
    alt: 'sparkles emoji',
  },
];

/**
 * Replaces all shortcodes in the input string with corresponding image tags
 * @param input - The string to process
 * @returns The string with shortcodes replaced by image tags
 */
export function replaceShortcodes(input: string): string {
  if (!input) return input;
  
  let result = input;
  
  for (const config of SHORTCODE_MAP) {
    const imageTag = `<img src="${config.imagePath}" alt="${config.alt}" class="custom-emoji" />`;
    result = result.replaceAll(config.shortcode, imageTag);
  }
  
  return result;
}

/**
 * Astro component helper that returns HTML with replaced shortcodes
 * Safe for use with set:html directive
 */
export function replaceShortcodesHTML(input: string): string {
  return replaceShortcodes(input);
}
