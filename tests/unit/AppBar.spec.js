import { mount, RouterLinkStub } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import AppBar from '../../src/components/AppBar';
import Vuex from 'vuex';

Vue.use(Vuetify);
Vue.use(Vuex);

describe('AppBar', () => {
  let vuetify;
  let store;
  let dispatchMock;

  beforeEach(() => {
    vuetify = new Vuetify();
    dispatchMock = jest.fn();

    store = new Vuex.Store({
      getters: {
        getTotalResults: () => 10,
      },
      actions: {
        fetchHeadlinesBySearchQuery: dispatchMock,
      },
    });
  });

  it('renders the app bar with the correct elements', () => {
    const wrapper = mount(AppBar, {
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub,
        'v-img': true,
        'v-text-field': true,
      },
    });
    // console.log(wrapper, 'appbar wrapper')

    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'v-text-field' }).exists()).toBe(true);
  });

  // it('performs a search when input is entered', async () => {
  //   const wrapper = mount(AppBar, {
  //     vuetify,
  //     stubs: {
  //       RouterLink: RouterLinkStub,
  //       'v-img': true,
  //       'v-text-field': true,
  //     },
  //     mocks: {
  //       $store: store,
  //     },
  //   });
  
  //   const searchField = wrapper.findComponent({ name: 'v-text-field' });
  
  //   wrapper.setData({ searchQuery: 'test query' }); // Set the search query using setData
  
  //   await searchField.trigger('input');
  
  //   console.log(dispatchMock.mock.calls, 'test console'); // Check the calls made to dispatch
  
  //   expect(dispatchMock).toHaveBeenCalledWith({
  //     type: 'fetchHeadlinesBySearchQuery',
  //     payload: 'test query',
  //   });
  // });
});
