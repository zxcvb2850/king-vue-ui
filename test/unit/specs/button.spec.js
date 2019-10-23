import Vue from "vue";
import { expect } from "chai";
import Button from "../../../src/components/button";

describe("Button", () => {
  const Ctor = Vue.extend(Button);

  it("create", () => {
    const wrapper = new Ctor().$mount();
    const buttonElm = wrapper.$el;

    expect(buttonElm.classList.contains("k-button--default")).to.be.true;
  });

  it("type and icon", () => {
    const wrapper = new Ctor({
      propsData: {
        type: "warning",
        icon: "k-icon-enter",
      },
    }).$mount();
    const buttonElm = wrapper.$el;

    expect(buttonElm.classList.contains("k-button--warning")).to.be.true;
    expect(buttonElm.querySelector(".k-icon-enter")).to.be.ok;
  });

  it("disable", () => {
    const wrapper = new Ctor({
      propsData: {
        disabled: true,
      },
    }).$mount();
    const buttonElm = wrapper.$el;

    expect(buttonElm.getAttribute("disabled")).to.be.ok;
  });

  it("round", () => {
    const wrapper = new Ctor({
      propsData: {
        round: true,
      },
    }).$mount();
    const buttonElm = wrapper.$el;

    expect(buttonElm.classList.contains("is-round")).to.be.true;
  });

  it("circle", () => {
    const wrapper = new Ctor({
      propsData: {
        circle: true,
      },
    }).$mount();
    const buttonElm = wrapper.$el;

    expect(buttonElm.classList.contains("is-circle")).to.be.true;
  });
});
