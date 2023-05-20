import NewsService from '@/services/NewsService';
import { EventBus } from '../../../event-bus';

export const fetchLatestHeadlines = async ({ commit }, page) => {
  // console.log(page, 'page');
  commit('SET_LOADING', true);

  try {
    const res = await NewsService.fetchLatestHeadlines(page);
    commit('SET_NEWS', res.data);
  } catch (error) {
    EventBus.$emit('showErrorSnackbar', error);
  }

  commit('SET_LOADING', false);
};

export const fetchHeadlinesBySources = async ({ commit }, data) => {
  // console.log(data, 'data-actions');

  commit('SET_LOADING', true);

  try {
    const { page, sources } = data;
    const res = await NewsService.fetchHeadlinesBySources(sources, page);
    commit('SET_FILTERED_NEWS', res.data);
  } catch (error) {
    EventBus.$emit('showErrorSnackbar', error);
  }

  commit('SET_LOADING', false);
};

export const setTitle = async ({ commit }, payload) => {
  commit('SET_TITLE', payload);
};

export const setHistory = async ({ commit }, payload) => {
  // console.log(payload, 'visited actions');
  commit('SET_HISTORY', payload);
};

export const fetchSources = async ({ commit }) => {
  const res = await NewsService.fetchSources();
  commit('SET_SOURCES', res.data);
};

export const fetchHeadlinesBySearchQuery = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const res = await NewsService.fetchHeadlinesBySearchQuery(payload);
    commit('SET_NEWS', res.data);
  } catch (error) {
    EventBus.$emit('showErrorSnackbar', error);
  }

  commit('SET_LOADING', false);
};

export const errorAPICall = async ({ commit }) => {
  commit('SET_LOADING', true);

  try {
    await NewsService.errorAPICall();
  } catch (error) {
    EventBus.$emit('showErrorSnackbar', error);
  }

  commit('SET_LOADING', false);
};
