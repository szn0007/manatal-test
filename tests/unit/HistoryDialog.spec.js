import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
import HistoryDialog from '@/components/HistoryDialog';

describe('HistoryDialog', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders the dialog when value prop is true', async () => {
    const wrapper = mount(HistoryDialog, {
      vuetify,
      propsData: {
        value: true,
        news: [],
      },
      stubs: {
        'v-dialog': true,
        'v-card': true,
        'v-card-title': true,
        'v-card-text': true,
        'v-list': true,
        'v-list-item': true,
        'v-divider': true,
        'v-list-item-avatar': true,
        'v-img': true,
        'v-list-item-content': true,
        'v-list-item-title': true,
        'v-list-item-subtitle': true,
        'v-btn': true,
        'v-icon': true,
        'v-spacer': true,
      },
    });

    // Wait for the next tick to ensure the component has finished rendering
    await wrapper.vm.$nextTick();
    // console.log(wrapper.findComponent({name: 'v-dialog'}), 'historyDialog wrapper')

    // Assert that the dialog is rendered
    expect(wrapper.findComponent({name: 'v-dialog'}).exists()).toBe(true);
  });

  it('renders the dialog with the correct elements', () => {
    const news = [
      { id: 1, title: 'News 1', description: 'Description 1', urlToImage: 'image1.jpg' },
      { id: 2, title: 'News 2', description: 'Description 2', urlToImage: 'image2.jpg' },
    ];

    const wrapper = mount(HistoryDialog, {
      vuetify,
      propsData: {
        value: true,
        news: news,
      },
      stubs: {
        'v-dialog': true,
        'v-card': true,
        'v-card-title': true,
        'v-card-text': true,
        'v-list': true,
        'v-list-item': true,
        'v-divider': true,
        'v-list-item-avatar': true,
        'v-img': true,
        'v-list-item-content': true,
        'v-list-item-title': true,
        'v-list-item-subtitle': true,
        'v-btn': true,
        'v-icon': true,
        'v-spacer': true,
      },
    });

    // console.log(wrapper.find('.subtitle-1.font-weight-bold.grey.lighten-2'))
    expect(wrapper.find('.subtitle-1.font-weight-bold.grey.lighten-2').exists()).toBe(true);
  });

  it('renders the dialog with the correct elements', () => {
    const news = [];

    const wrapper = mount(HistoryDialog, {
      vuetify,
      propsData: {
        value: true,
        news: news,
      },
      stubs: {
        'v-dialog': true,
        'v-card': true,
        'v-card-title': true,
        'v-card-text': true,
        'v-list': true,
        'v-list-item': true,
        'v-divider': true,
        'v-list-item-avatar': true,
        'v-img': true,
        'v-list-item-content': true,
        'v-list-item-title': true,
        'v-list-item-subtitle': true,
        'v-btn': true,
        'v-icon': true,
        'v-spacer': true, // Stub the v-spacer component
      },
    });

    // console.log(wrapper)
    expect(wrapper.findAll('.v-list').length).toBe(0);
    // console.log(wrapper.find('.no-history-found'))
    expect(wrapper.find('.no-history-found').text()).toBe('No history found......');
  });
});
