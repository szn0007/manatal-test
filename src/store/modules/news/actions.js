import NewsService from '@/services/NewsService';

export const fetchLatestHeadlines = async ({ commit }) => {
  const res = await NewsService.fetchLatestHeadlines();
  commit('SET_NEWS', res.data.articles);
};
