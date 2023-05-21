import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('renders the app title', () => {
    const wrapper = mount(App);
    expect(wrapper.find('.title').text()).to.equal('My App');
  });
});