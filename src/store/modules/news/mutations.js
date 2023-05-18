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

export const SET_TITLE = (state, payload) => {
  state.news.articles = state.news.articles.map((item) => {
    if (item.id === payload.id) {
      return {
        ...item,
        title: payload.title,
      };
    }
    return item;
  });
};
