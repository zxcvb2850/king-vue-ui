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
});
