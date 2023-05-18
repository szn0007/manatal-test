import API from './api';

const { VUE_APP_API_KEY } = process.env;

export default {
  fetchLatestHeadlines() {
    return API.get(`/top-headlines?country=us&apiKey=${VUE_APP_API_KEY}`);
  },
};
