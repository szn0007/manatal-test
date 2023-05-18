export const SET_NEWS = (state, news) => {
  const newsData = news.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  state.news = newsData;
};
