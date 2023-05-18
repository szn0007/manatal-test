import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import news from './modules/news';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'news-application',
  storage: localForage,
  asyncStorage: true,
});

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    news,
  },
  plugins: [vuexLocal.plugin],
});
