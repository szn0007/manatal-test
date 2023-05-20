import NewsService from '@/services/NewsService';

export const fetchLatestHeadlines = async ({ commit }, page) => {
  // console.log(page, 'page');
  const res = await NewsService.fetchLatestHeadlines(page);
  commit('SET_NEWS', res.data);
};

export const fetchHeadlinesBySources = async ({ commit }, data) => {
  // console.log(data, 'data-actions');
  const { page, sources } = data;
  const res = await NewsService.fetchHeadlinesBySources(sources, page);
  commit('SET_FILTERED_NEWS', res.data);
};

export const setTitle = async ({ commit }, payload) => {
  commit('SET_TITLE', payload);
};

export const setHistory = async ({ commit }, payload) => {
  // console.log(payload, 'visited actions');
  commit('SET_HISTORY', payload);
};

export const fetchSources = async ({ commit }) => {
  const res = await NewsService.fetchSources();
  commit('SET_SOURCES', res.data);
};

export const fetchHeadlinesBySearchQuery = async ({ commit }, payload) => {
  const res = await NewsService.fetchHeadlinesBySearchQuery(payload);
  commit('SET_NEWS', res.data);
};
