import NewsService from '@/services/NewsService';

export const fetchLatestHeadlines = async ({ commit }, page) => {
  const res = await NewsService.fetchLatestHeadlines(page);
  commit('SET_NEWS', res.data);
};

export const setTitle = async ({ commit }, payload) => {
  commit('SET_TITLE', payload);
};
