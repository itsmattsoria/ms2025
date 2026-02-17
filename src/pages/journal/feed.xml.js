import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { journalEntriesFull } from '../../utils/data';

const posts = journalEntriesFull;
console.log(posts[1]);
export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: "Matt Soria's Journal",
    // `<description>` field in output xml
    description: 'A collection of thoughts, musings, snapshots, and doodles.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map(post => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      image: post.journalImage.length > 0 ? post.journalImage[0].url : null,
      link: `https://mattsoria.com/journal/${post.slug}`,
      categories: post.categories.map(category => category.title),
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
