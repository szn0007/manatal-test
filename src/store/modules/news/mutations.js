export const SET_NEWS = (state, news) => {
  const newsData = {
    ...news,
    articles: news.articles.map((item, index) => ({
      ...item,
      id: index + 1,
    })),
  };
  state.news = newsData;
  state.filterBySource = false;
};

export const SET_FILTERED_NEWS = (state, news) => {
  const newsData = {
    ...news,
    articles: news.articles.map((item, index) => ({
      ...item,
      id: index + 1,
    })),
  };
  state.news = newsData;
  state.filterBySource = true;
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

export const SET_SOURCES = (state, payload) => {
  state.sources = payload.sources;
};
