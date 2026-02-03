/**
 * Core API functions for fetching data from Craft CMS GraphQL API
 */

interface GraphQLResponse<T = any> {
  data: T;
  errors?: any[];
}

/**
 * Fetch multiple entries from Craft CMS
 */
export async function getEntries(query: string) {
  const baseUrl = import.meta.env.BASEURL;
  const url = new URL('api', baseUrl);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  }).catch((error) => {
    console.error("Error fetching entries:", error);
    throw error;
  });
  
  const json: GraphQLResponse = await response.json();
  
  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(`GraphQL query failed: ${json.errors[0]?.message || 'Unknown error'}`);
  }
  
  if (!json.data || !json.data.entries) {
    throw new Error('No entries data returned from GraphQL query');
  }
  
  return json.data.entries;
}

/**
 * Fetch a single entry from Craft CMS
 */
export async function getEntry(query: string) {
  const baseUrl = import.meta.env.BASEURL;
  const url = new URL('api', baseUrl);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  }).catch((error) => {
    console.error("Error fetching entry:", error);
    throw error;
  });
  
  const json: GraphQLResponse = await response.json();
  
  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(`GraphQL query failed: ${json.errors[0]?.message || 'Unknown error'}`);
  }
  
  if (!json.data || !json.data.entry) {
    throw new Error('No entry data returned from GraphQL query');
  }
  
  return json.data.entry;
}
