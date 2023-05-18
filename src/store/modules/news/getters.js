export const getLatestHeadlines = (state) => {
  const temp = [];
  state.news.articles.map((item, index) => {
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

export const getTotalPages = (state) => Math.ceil(state.news.totalResults / 10);

export const getDetails = (state) => (id) => state.news.articles.find((item) => item.id === Number(id));
