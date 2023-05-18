import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
import news from './modules/news';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'news-application',
  storage: localForage,
  asyncStorage: true,
});

export default new Vuex.Store({
  modules: {
    news,
  },
  plugins: [vuexLocal.plugin],
});
