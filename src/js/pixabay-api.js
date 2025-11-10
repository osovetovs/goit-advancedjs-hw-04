import axios from 'axios';

const API_KEY = '53177418-be0a13a4cac66b8f426193572';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;
let currentQuery = '';
export const perPage = 15;

export async function fetchImages(query, page = 1) {
  if (query !== currentQuery) {
    currentPage = 1;
    currentQuery = query;
  } else {
    currentPage = page;
  }

  const URL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`;

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export function incrementPage() {
  currentPage += 1;
}

export function resetPage() {
  currentPage = 1;
}

export function getCurrentQuery() {
  return currentQuery;
}

export function getCurrentPage() {
  return currentPage;
}
