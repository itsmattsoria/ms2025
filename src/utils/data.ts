/**
 * Pre-fetched data that executes once at build time
 * Import these when you need the data without re-fetching
 */

import { getEntries } from './craftApi';

import { JOURNAL_ENTRIES_QUERY } from './queries';
export const journalEntries = await getEntries(JOURNAL_ENTRIES_QUERY);

import { JOURNAL_ENTRY_FULL_QUERY } from './queries';
export const journalEntriesFull = await getEntries(JOURNAL_ENTRY_FULL_QUERY);

import { JOURNAL_LINKS_QUERY } from './queries';
export const journalLinks = await getEntries(JOURNAL_LINKS_QUERY);
