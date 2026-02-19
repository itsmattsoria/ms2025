import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { journalLinks } from '../../utils/data';

const posts = journalLinks;
console.log(posts);
export function GET(context) {
  return rss({
    title: "Matt Soria's Links",
    stylesheet: '/pretty-feed-v3.xsl',
    description:
      "A log of the things I'm reading, watching, and listening to, and have found interesting or noteworthy.",
    site: 'https://mattsoria.com/links',
    trailingSlash: false,
    items: posts.map(post => ({
      title: post.title,
      description: post.note?.rawHtml,
      pubDate: post.postDate,
      link: post.externalLink,
      categories: post.categories.map(category => category.title),
      content: (() => {
        let postContent = '';
        postContent += `<p><a href="${post.externalLink}">${post.title}</a></p><p>By ${post.sourceAuthor}, and shared by me on ${post.postDate}</p>`;
        if (post.note) {
          postContent += sanitizeHtml(post.note.rawHtml);
        }
        if (post.rating) {
          postContent += `<p>Rating: ${post.rating}</p>`;
        }
        if (post.externalType) {
          postContent += `<p>Link Type: ${post.externalType}</p>`;
        }
        return postContent;
      })(),
    })),
    customData: `<language>en-us</language>`,
  });
}
