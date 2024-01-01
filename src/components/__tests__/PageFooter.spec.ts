import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PageFooter from "../PageFooter.vue";
import { appVersion } from "../../composables/useCalculations";
import { version } from "vue";

describe("PageFooter", () => {
  it("renders properly", () => {
    const wrapper = mount(PageFooter, {
      props: {
        loanDetails: {},
      },
    });

    expect(appVersion).toMatch(/^1\.[0-9]\.\d$/);
    expect(version).toMatch(/^3\.4\./);

    expect(wrapper.text()).toContain(`NNM Loan calculator ${appVersion}`);
    expect(wrapper.text()).toContain(`Vue ${version}`);
    expect(wrapper.text()).toContain("Copyright");
    expect(wrapper.text()).toContain("Anders Gustafson");
    expect(wrapper.text()).toContain("Nemo nisi mors");
  });
});
