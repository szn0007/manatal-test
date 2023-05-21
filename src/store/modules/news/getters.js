export const getLatestHeadlines = (state) => {
  const temp = [];
  state?.news?.articles?.map((item, index) => {
    if (index > 0 && index < 4) {
      if (!temp[1]) {
        temp[1] = [];
      }
      temp[1].push(item);
    } else {
      temp.push(item);
    }
    return item;
  });
  return temp;
};

export const sources = (state) => state.sources.map((item) => ({
  id: item.id,
  name: item.name,
}));

export const getTotalPages = (state) => Math.ceil(state.news.totalResults / 10);

export const getTotalResults = (state) => state?.news.totalResults;

export const getDetails = (state) => (id) => state?.news.articles.find((item) => item.id === Number(id));

export const isfilterBySource = (state) => state.filterBySource;

export const getVisitedNews = (state) => state.history;
