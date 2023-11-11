import { beforeEach, describe, expect, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import InputForm from "../InputForm.vue";

describe("InputForm", () => {
  let wrapper: VueWrapper; //: VueWrapper<InputForm>;

  beforeEach(() => {
    wrapper = mount(InputForm, {
      props: {
        loanDetails: {
          useReferenceInterestRate: true,
          useTaxReduction: true,
          useYear: true,
          displayChart: true,
          amount: 123_000_000,
          loanInPercent: 45,
          interestRate: 12.5,
          referenceInterestRate: 99,
        },
      },
    });
  });

  it("renders properly", () => {
    const referenceInterestRateCheckbox = wrapper.get(
      "#useReferenceInterestRate",
    );
    const taxReduction = wrapper.get("#useTaxReduction");
    const amountInMSEK = wrapper.get("#amount");
    const loanInPercent = wrapper.get("#loanInPercent");
    const interestRate = wrapper.get("#interestRate");
    const referenceInterestRate = wrapper.get("#referenceInterestRate");

    expect(referenceInterestRateCheckbox.element).toHaveProperty(
      "checked",
      true,
    );
    expect(taxReduction.element).toHaveProperty("checked", true);
    expect(amountInMSEK.element).toHaveProperty("value", "123");
    expect(loanInPercent.element).toHaveProperty("value", "45");
    expect(interestRate.element).toHaveProperty("value", "12.5");
    expect(referenceInterestRate.element).toHaveProperty("value", "99");
  });

  describe("toggles boolean checkboxes", () => {
    it("use reference interest rate", () => {
      const referenceInterestRateCheckbox = wrapper.get(
        "#useReferenceInterestRate",
      );

      expect(referenceInterestRateCheckbox.element).toHaveProperty(
        "checked",
        true,
      );

      referenceInterestRateCheckbox.trigger("click");

      expect(referenceInterestRateCheckbox.element).toHaveProperty(
        "checked",
        false,
      );

      referenceInterestRateCheckbox.trigger("click");

      expect(referenceInterestRateCheckbox.element).toHaveProperty(
        "checked",
        true,
      );
    });

    it("use tax reduction", () => {
      const taxReduction = wrapper.get("#useTaxReduction");

      expect(taxReduction.element).toHaveProperty("checked", true);

      taxReduction.trigger("click");

      expect(taxReduction.element).toHaveProperty("checked", false);

      taxReduction.trigger("click");

      expect(taxReduction.element).toHaveProperty("checked", true);
    });
  });

  describe("number values can be changed", () => {
    it("amount works", async () => {
      const amountInMSEK = wrapper.get("#amount");

      const configuredAmountInMSEK = wrapper.get(
        "[data-test='configured-amount-in-MSEK']",
      );

      expect(configuredAmountInMSEK.text()).toContain("123 000 000 kr");

      await amountInMSEK.setValue("98");

      expect(configuredAmountInMSEK.text()).toContain("98 000 000 kr");
    });

    it("interest rest works", async () => {
      const interestRate = wrapper.get("#interestRate");

      const configuredInterestRate = wrapper.get(
        "[data-test='configured-interest-rate']",
      );

      expect(configuredInterestRate.text()).toContain("12,50 %");

      await interestRate.setValue("22.75");

      expect(configuredInterestRate.text()).toContain("22,75 %");
    });

    it("reference interest rest works", async () => {
      const referenceInterestRate = wrapper.get("#referenceInterestRate");

      const configuredReferenceInterestRate = wrapper.get(
        "[data-test='configured-reference-interest-rate']",
      );

      expect(configuredReferenceInterestRate.text()).toContain("99,00 %");

      await referenceInterestRate.setValue("65.25");

      expect(configuredReferenceInterestRate.text()).toContain("65,25 %");
    });

    it("loan in percent works", async () => {
      const loanInPercent = wrapper.get("#loanInPercent");

      const configuredLoanInPercent = wrapper.get(
        "[data-test='configured-loan-in-percent']",
      );

      expect(configuredLoanInPercent.text()).toContain("45 %");

      await loanInPercent.setValue("50");

      expect(configuredLoanInPercent.text()).toContain("50 %");
    });
  });
});
