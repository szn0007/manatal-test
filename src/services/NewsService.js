import API from './api';

const { VUE_APP_API_KEY } = process.env;

export default {
  async fetchLatestHeadlines(page) {
    try {
      const res = await API.get(`/top-headlines?country=us&apiKey=${VUE_APP_API_KEY}&pageSize=10&page=${page}`);
      // console.log(res);
      if (res.status === 200) {
        return res;
      }
      throw new Error('Failed to fetch headlines');
    } catch (error) {
      console.error('An error occurred while fetching headlines:', error);
      throw error.response.data.message;
    }
  },
  async fetchHeadlinesBySources(sources, page) {
    try {
      const res = await API.get(`/top-headlines?sources=${sources}&apiKey=${VUE_APP_API_KEY}&pageSize=10&page=${page}`);
      // console.log(res);
      if (res.status === 200) {
        return res;
      }
      throw new Error('Failed to fetch headlines');
    } catch (error) {
      console.error('An error occurred while fetching headlines:', error);
      throw error.response.data.message;
    }
  },
  async fetchSources() {
    try {
      const res = await API.get(`/sources?apiKey=${VUE_APP_API_KEY}`);
      // console.log(res);
      if (res.status === 200) {
        return res;
      }
      throw new Error('Failed to fetch sources');
    } catch (error) {
      console.error('An error occurred while fetching sources:', error);
      throw error.response.data.message;
    }
  },
  async fetchHeadlinesBySearchQuery(searchQuery) {
    try {
      const res = await API.get(`/top-headlines?q=${searchQuery}&apiKey=${VUE_APP_API_KEY}`);
      console.log(res);
      if (res.status === 200) {
        return res;
      }
      throw new Error('Failed to fetch headlines');
    } catch (error) {
      console.error('An error occurred while fetching headlines:', error);
      throw error.response.data.message;
    }
  },
  async errorAPICall() {
    try {
      const res = await API.get('https://newsapi.org/v2/sources?apiKey');
      console.log(res);
      if (res.status === 200) {
        return res;
      }
      throw new Error('Failed to fetch headlines');
    } catch (error) {
      console.error('An error occurred while fetching headlines:', error);
      throw error.response.data.message;
    }
  },
};
