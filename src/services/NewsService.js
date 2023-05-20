import API from './api';

const { VUE_APP_API_KEY } = process.env;

export default {
  fetchLatestHeadlines(page) {
    return API.get(`/top-headlines?country=us&apiKey=${VUE_APP_API_KEY}&pageSize=10&page=${page}`);
  },
  fetchHeadlinesBySources(sources, page) {
    return API.get(`/top-headlines?sources=${sources}&apiKey=${VUE_APP_API_KEY}&pageSize=10&page=${page}`);
  },
  fetchSources() {
    return API.get(`/sources?apiKey=${VUE_APP_API_KEY}`);
  },
  fetchHeadlinesBySearchQuery(searchQuery) {
    return API.get(`/top-headlines?q=${searchQuery}&apiKey=${VUE_APP_API_KEY}`);
  },
};
