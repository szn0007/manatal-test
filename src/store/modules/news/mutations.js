export const SET_NEWS = (state, news) => {
  const newsData = {
    ...news,
    articles: news.articles.map((item, index) => ({
      ...item,
      id: index + 1,
    })),
  };
  state.news = newsData;
};
