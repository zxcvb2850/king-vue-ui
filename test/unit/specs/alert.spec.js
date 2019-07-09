import Vue from "vue";
import { expect } from "chai";
import Alert from '../../../src/components/alert';

describe('Alert', () => {
  it('create', () => {
    const wrapper = Vue(Alert).$mount()
  });
});
