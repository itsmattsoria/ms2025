import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { journalEntriesFull } from '../../utils/data';

const posts = journalEntriesFull;
export function GET(context) {
  return rss({
    title: "Matt Soria's Journal",
    stylesheet: '/pretty-feed-v3.xsl',
    description: 'A collection of thoughts, musings, snapshots, and doodles.',
    site: 'https://mattsoria.com/journal',
    trailingSlash: false,
    items: posts.map(post => ({
      title: post.title,
      description: post.description,
      pubDate: post.postDate,
      image: post.journalImage.length > 0 ? post.journalImage[0].url : null,
      link: `https://mattsoria.com/journal/${post.slug}`,
      categories: post.categories.map(category => category.title),
      content: (() => {
        let postContent = '';
        if (post.journalImage[0]) {
          postContent += `<img src="${post.journalImage[0].url}" alt="${post.journalImage[0].alt}" />`;
        }
        if (post.note) {
          postContent += `<p>${post.note.rawHtml}</p>`;
        }
        post.journalContent.map(block => {
          switch (block.typeHandle) {
            case 'journalImage':
              if (block.blockId) {
                postContent += `<div id="${block.blockId}">`;
              }
              postContent += `<img src="${block.journalImage[0].url}" alt="${block.journalImage[0].alt}" />`;
              if (block.blockId) {
                postContent += `</div>`;
              }
              break;
            case 'textSection':
              if (block.blockId) {
                postContent += `<div id="${block.blockId}">`;
              }
              postContent += sanitizeHtml(block.richText);
              if (block.blockId) {
                postContent += `</div>`;
              }
              break;
            case 'embed':
              if (block.blockId) {
                postContent += `<div id="${block.blockId}">`;
              }
              postContent += sanitizeHtml(block.embed);
              if (block.blockId) {
                postContent += `</div>`;
              }
              break;
            case 'codeBlock':
              if (block.blockId) {
                postContent += `<div id="${block.blockId}">`;
              }
              postContent += sanitizeHtml(block.codeBlock);
              if (block.blockId) {
                postContent += `</div>`;
              }
              break;
          }
        });
        return postContent;
      })(),
    })),
    customData: `<language>en-us</language>`,
  });
}
