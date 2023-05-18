export const getLatestHeadlines = (state) => {
  const temp = [];
  state.news.map((item, index) => {
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
