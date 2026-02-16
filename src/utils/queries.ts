/**
 * Centralized GraphQL query definitions for Craft CMS
 */

/**
 * Query for fetching journal writing entries with all necessary fields
 */
export const JOURNAL_ENTRIES_QUERY = `{
  entries(site: "personal", section: "personalJournal") {
    id
    title
    slug
    postDate
    ... on journalEntry_Entry {
      categories(status: ["live"]) {
        title
        status
        slug
      }
      journalImage {
        ... on personal_Asset {
          alt
          url
          title
          focalPoint
          width
          height
          captionSimple
        }
      }
    }
  }
}`;

/**
 * Query for fetching journal writing entries with full content (for individual pages)
 */
export const JOURNAL_ENTRY_FULL_QUERY = `{
  entries(site: "personal", section: "personalJournal") {
    id
    title
    slug
    postDate
    ... on journalEntry_Entry {
      note {
        rawHtml
      }
      journalImage {
        ... on personal_Asset {
          alt
          url
          title
          focalPoint
          width
          height
          captionSimple
        }
      }
      categories(status: ["live"]) {
        title
        status
        slug
      }
      journalContent {
        ... on journalImage_Entry {
          typeHandle
          journalImage {
            ... on personal_Asset {
              alt
              url
              title
              focalPoint
              width
              height
              captionSimple
            }
          }
        }
        ... on textSection_Entry {
          typeHandle
          richText
          blockId
          sectionClasses
        }
        ... on embed_Entry {
          typeHandle
          embed
          blockId
          sectionClasses
        }
        ... on codeBlock_Entry {
          typeHandle
          codeLanguage
          codeBlock
          blockId
          sectionClasses
        }
      }
    }
  }
}`;

/**
 * Query for fetching link entries
 */
export const JOURNAL_LINKS_QUERY = `{
  entries(site: "personal", section: "personalLinks") {
    id
    title
    slug
    postDate
    ... on linkEntry_Entry {
      externalLink
      sourceAuthor
      note
      externalType
      rating
      categories(status: ["live"]) {
        title
        status
        slug
      }
    }
  }
}`;

/**
 * Query for fetching the home page entry
 */
export const HOME_PAGE_QUERY = `{
  entry(site: "personal", section: "personalPages", type: "personalHome") {
    ... on personalHome_Entry {
      note
      notification
      portrait {
        ... on personal_Asset {
          alt
          url
          title
          focalPoint
          width
          height
          captionSimple
        }
      }
      nowReading {
        bookTitle
        author
        image {
          ... on personal_Asset {
            alt
            url
            width
            height
          }
        }
      }
    }
  }
}`;

/** Query for fetching pages in the personalPages section */
export const PERSONAL_PAGES_QUERY = `{
  entries(site: "personal", section: "personalPages", type: "default") {
    title
    slug
    ... on default_Entry {
      pageContent {
        ... on image_Entry {
          typeHandle
          image {
            ... on personal_Asset {
              alt
              url
              title
              focalPoint
              width
              height
              captionSimple
            }
          }
          blockId
          sectionClasses
        }
        ... on textSection_Entry {
          typeHandle
          richText
          blockId
          sectionClasses
        }
      }
    }
  }
}`;

/**
 * Query for fetching journal categories
 */
export const JOURNAL_CATEGORIES_QUERY = `{
  entries(site: "personal", section: "personalCategories") {
    id
    title
    slug
  }
}`;

/**
 * Query builder for fetching journal entries by category ID
 */
export const journalEntriesByCategoryQuery = (categoryId: number | string) => `{
  entries(site: "personal", section: "personalJournal", relatedTo: ["${categoryId}"]) {
    id
    title
    slug
    postDate
    ... on journalEntry_Entry {
      categories(status: ["live"]) {
        title
        status
        slug
      }
      journalImage {
        ... on personal_Asset {
          alt
          url
          title
          focalPoint
          width
          height
          captionSimple
        }
      }
    }
  }
}`;

/**
 * Query builder for fetching journal links by category ID
 */
export const linksEntriesByCategoryQuery = (categoryId: number | string) => `{
  entries(site: "personal", section: "personalLinks", type:"linkEntry", relatedTo: ["${categoryId}"]) {
    id
    title
    slug
    postDate
    ... on linkEntry_Entry {
      externalLink
      sourceAuthor
      note
      externalType
      categories(status: ["live"]) {
        title
        status
        slug
      }
    }
  }
}`;

/**
 * Query for fetching navigation entries
 */
export const NAVIGATION_QUERY = `{
  entries(site: "personal", section: "personalNavigation", type:"navigation_default") {
    ...on navigation_default_Entry {
      entryRef(status:["live"]) {
        title
        slug
        url
      }
    }
  }
}`;

/**
 * Query for fetching footer data
 */
export const FOOTER_QUERY = `{
  entry(site: "personal", section: "personalFooter") {
    ... on personalFooter_Entry {
      linksIntro {
        plainText
      }
      links {
        ... on linkWithTooltip_Entry {
          linkField {
            url
            target
            class
            id
            label
            ariaLabel
          }
          tooltip {
            rawHtml
          }
          linkColor
        }
      }
    }
  }
}`;
