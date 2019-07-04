import Vue from 'vue';
import { expect } from 'chai';
import Alert from '@/components/alert';

describe('Alert', () => {
  const Ctor = Vue.extend(Alert);

  it('create', () => {
    const wrapper = new Ctor({
      propsData: {
        title: 'test',
        showIcon: true,
      },
    }).$mount();
    expect(wrapper.$el.querySelector('.k-alert__title').textContent).to.equal('test');
  });

  it('description', () => {
    const wrapper = new Ctor({
      propsData: {
        title: 'test',
        showIcon: true,
        description: 'test description',
      },
    }).$mount();
    expect(wrapper.$el.textContent).to.contain('description');
  });
});
