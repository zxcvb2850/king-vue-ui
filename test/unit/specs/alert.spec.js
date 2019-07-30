import Vue from "vue";
import { expect } from "chai";
import Alert from "../../../src/components/alert";

describe("Alert", () => {
  const Ctor = Vue.extend(Alert);

  it("create", () => {
    const wrapper = new Ctor({
      propsData: {
        title: "test",
        showIcon: true,
      },
    }).$mount();

    expect(wrapper.$el.querySelector(".k-alert__title").textContent).to.equal("test");
  });

  it("type", () => {
    const wrapper = new Ctor({
      propsData: {
        title: "test",
        type: "success",
        showIcon: true,
      },
    }).$mount();

    expect(wrapper.$el.classList.contains("k-alert--success")).to.true;
  });

  it("description", () => {
    const wrapper = new Ctor({
      propsData: {
        title: "test",
        description: "test description",
        showIcon: true,
      },
    }).$mount();

    expect(wrapper.$el.querySelector(".k-alert__description").textContent).to.equal("test description");
  });
});
