// import { createStore } from 'vuex';
// import {
//   fetchLatestHeadlines,
//   fetchHeadlinesBySources,
//   setTitle,
//   setHistory,
//   fetchSources,
//   fetchHeadlinesBySearchQuery,
//   errorAPICall,
// } from '@/store/modules/news/actions';
// import NewsService from '@/services/NewsService';
// import { EventBus } from '@/event-bus';

// jest.mock('@/services/NewsService'); // Mock the NewsService module

// describe('Vuex Actions', () => {
//   let store;

//   beforeEach(() => {
//     store = createStore({
//       state: {
//         loading: false,
//         news: [],
//         filteredNews: [],
//         title: '',
//         history: null,
//         sources: [],
//       },
//       mutations: {
//         SET_LOADING(state, loading) {
//           state.loading = loading;
//         },
//         SET_NEWS(state, news) {
//           state.news = news;
//         },
//         SET_FILTERED_NEWS(state, filteredNews) {
//           state.filteredNews = filteredNews;
//         },
//         SET_TITLE(state, title) {
//           state.title = title;
//         },
//         SET_HISTORY(state, history) {
//           state.history = history;
//         },
//         SET_SOURCES(state, sources) {
//           state.sources = sources;
//         },
//       },
//       actions: {
//         fetchLatestHeadlines,
//         fetchHeadlinesBySources,
//         setTitle,
//         setHistory,
//         fetchSources,
//         fetchHeadlinesBySearchQuery,
//         errorAPICall,
//       },
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('fetchLatestHeadlines calls the NewsService and commits the result', async () => {
//     const mockResponse = { data: [{ title: 'News 1' }, { title: 'News 2' }] };
//     NewsService.fetchLatestHeadlines.mockResolvedValue(mockResponse);

//     await store.dispatch('fetchLatestHeadlines', 1);

//     expect(NewsService.fetchLatestHeadlines).toHaveBeenCalledWith(1);
//     expect(store.state.news).toEqual(mockResponse.data);
//   });

//   it('fetchHeadlinesBySources calls the NewsService and commits the result', async () => {
//     const mockResponse = { data: [{ title: 'News 1' }, { title: 'News 2' }] };
//     NewsService.fetchHeadlinesBySources.mockResolvedValue(mockResponse);

//     await store.dispatch('fetchHeadlinesBySources', { page: 1, sources: ['source1', 'source2'] });

//     expect(NewsService.fetchHeadlinesBySources).toHaveBeenCalledWith(['source1', 'source2'], 1);
//     expect(store.state.filteredNews).toEqual(mockResponse.data);
//   });

//   it('setTitle commits the provided title', async () => {
//     const title = 'My Title';

//     await store.dispatch('setTitle', title);

//     expect(store.state.title).toEqual(title);
//   });

//   it('setHistory commits the provided history', async () => {
//     const history = { id: 1, title: 'Visited Page' };

//     await store.dispatch('setHistory', history);

//     expect(store.state.history).toEqual(history);
//   });

//   it('fetchSources calls the NewsService and commits the result', async () => {
//     const mockResponse = { data: ['source1', 'source2'] };
//     NewsService.fetchSources.mockResolvedValue(mockResponse);

//     await store.dispatch('fetchSources');

//     expect(NewsService.fetchSources).toHaveBeenCalled();
//     expect(store.state.sources).toEqual(mockResponse.data);
//   });

//   it('fetchHeadlinesBySearchQuery calls the NewsService and commits the result', async () => {
//     const mockResponse = { data: [{ title: 'News 1' }, { title: 'News 2' }] };
//     NewsService.fetchHeadlinesBySearchQuery.mockResolvedValue(mockResponse);

//     await store.dispatch('fetchHeadlinesBySearchQuery', 'search query');

//     expect(NewsService.fetchHeadlinesBySearchQuery).toHaveBeenCalledWith('search query');
//     expect(store.state.news).toEqual(mockResponse.data);
//   });

//   it('errorAPICall calls the NewsService and emits an error event on failure', async () => {
//     const errorMessage = 'API error';
//     const error = new Error(errorMessage);
//     NewsService.errorAPICall.mockRejectedValue(error);

//     const showErrorSnackbarSpy = jest.spyOn(EventBus, '$emit');

//     await store.dispatch('errorAPICall');

//     expect(NewsService.errorAPICall).toHaveBeenCalled();
//     expect(showErrorSnackbarSpy).toHaveBeenCalledWith('showErrorSnackbar', error);
//   });
// });
