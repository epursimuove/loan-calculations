import { describe } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, expect, it } from "vitest";
import ResultDashboard from "../ResultDashboard.vue";

describe("ResultDashboard", () => {
  let wrapper: VueWrapper; //VueWrapper<ResultDashboard>;

  beforeEach(() => {
    wrapper = mount(ResultDashboard, {
      props: {
        loanDetails: {
          useReferenceInterestRate: true,
          useTaxReduction: true,
          amount: 1_500_000,
          loanInPercent: 75,
          interestRate: 5.5,
          referenceInterestRate: 2,
        },
      },
    });
  });

  describe("renders properly", () => {
    describe("top part", () => {
      it("amount", () => {
        const resultAmount = wrapper.get("[data-test='result-amount']");

        expect(resultAmount.text()).toBe("1 500 000 kr");
      });

      it("cash", () => {
        const resultCash = wrapper.get("[data-test='result-cash']");
        const resultCashPercent = wrapper.get(
          "[data-test='result-cash-percent']",
        );

        expect(resultCash.text()).toBe("375 000 kr");
        expect(resultCashPercent.text()).toBe("25 %");
      });

      it("loan", () => {
        const resultLoan = wrapper.get("[data-test='result-loan']");
        const resultLoanPercent = wrapper.get(
          "[data-test='result-loan-percent']",
        );

        expect(resultLoan.text()).toBe("1 125 000 kr");
        expect(resultLoanPercent.text()).toBe("75 %");
      });
    });

    describe("bottom part", () => {
      it("1 % of loan", () => {
        const resultOnePercentOfLoanPerMonth = wrapper.get(
          "[data-test='result-one-percent-of-loan-per-month']",
        );
        const resultOnePercentOfLoanPerYear = wrapper.get(
          "[data-test='result-one-percent-of-loan-per-year']",
        );

        expect(resultOnePercentOfLoanPerMonth.text()).toBe("938 kr");
        expect(resultOnePercentOfLoanPerYear.text()).toBe("11 250 kr");
      });

      it("installment cost", () => {
        const resultInstallmentCostPerMonth = wrapper.get(
          "[data-test='result-installment-cost-per-month']",
        );
        const resultInstallmentCostPerYear = wrapper.get(
          "[data-test='result-installment-cost-per-year']",
        );
        const resultInstallmentPercent = wrapper.get(
          "[data-test='result-installment-percent']",
        );

        expect(resultInstallmentCostPerMonth.text()).toBe("1 875 kr");
        expect(resultInstallmentCostPerYear.text()).toBe("22 500 kr");
        expect(resultInstallmentPercent.text()).toBe("2 %");
      });

      it("interest rate", () => {
        const resultInterestRatePerMonth = wrapper.get(
          "[data-test='result-interest-rate-per-month']",
        );
        const resultInterestRatePerYear = wrapper.get(
          "[data-test='result-interest-rate-per-year']",
        );
        const resultInterestRate = wrapper.get(
          "[data-test='result-interest-rate']",
        );

        expect(resultInterestRatePerMonth.text()).toBe("5 156 kr");
        expect(resultInterestRatePerYear.text()).toBe("61 875 kr");
        expect(resultInterestRate.text()).toBe("5,50 %");
      });

      it("reference interest rate", () => {
        const resultReferenceInterestRatePerMonth = wrapper.get(
          "[data-test='result-reference-interest-rate-per-month']",
        );
        const resultReferenceInterestRatePerYear = wrapper.get(
          "[data-test='result-reference-interest-rate-per-year']",
        );
        const resultReferenceInterestRate = wrapper.get(
          "[data-test='result-reference-interest-rate']",
        );

        expect(resultReferenceInterestRatePerMonth.text()).toBe("1 875 kr");
        expect(resultReferenceInterestRatePerYear.text()).toBe("22 500 kr");
        expect(resultReferenceInterestRate.text()).toBe("2,00 %");
      });

      it("total cost", () => {
        const resultTotalCostPerMonth = wrapper.get(
          "[data-test='result-total-cost-per-month']",
        );
        const resultTotalCostPerYear = wrapper.get(
          "[data-test='result-total-cost-per-year']",
        );
        const resultTotalCostSummedRates = wrapper.get(
          "[data-test='result-total-cost-summed-rates']",
        );

        expect(resultTotalCostPerMonth.text()).toBe("7 031 kr");
        expect(resultTotalCostPerYear.text()).toBe("84 375 kr");
        expect(resultTotalCostSummedRates.text()).toBe("5,50 % + 2 %");
      });

      it("delta total cost", () => {
        const resultDeltaTotalCostPerMonth = wrapper.get(
          "[data-test='result-delta-total-cost-per-month']",
        );
        const resultDeltaTotalCostPerYear = wrapper.get(
          "[data-test='result-delta-total-cost-per-year']",
        );

        expect(resultDeltaTotalCostPerMonth.text()).toBe("+3 281 kr");
        expect(resultDeltaTotalCostPerYear.text()).toBe("+39 375 kr");
      });

      it("tax reduction", () => {
        const resultTaxReductionPerMonth = wrapper.get(
          "[data-test='result-tax-reduction-per-month']",
        );
        const resultTaxReductionPerYear = wrapper.get(
          "[data-test='result-tax-reduction-per-year']",
        );
        const resultTaxReductionPercent = wrapper.get(
          "[data-test='result-tax-reduction-percent']",
        );

        expect(resultTaxReductionPerMonth.text()).toBe("−1 547 kr");
        expect(resultTaxReductionPerYear.text()).toBe("−18 563 kr");
        expect(resultTaxReductionPercent.text()).toBe("1,65 %");
      });

      it("reduced interest rate", () => {
        const resultReducedInterestRatePerMonth = wrapper.get(
          "[data-test='result-reduced-interest-rate-per-month']",
        );
        const resultReducedInterestRatePerYear = wrapper.get(
          "[data-test='result-reduced-interest-rate-per-year']",
        );
        const resultReducedInterestRatePercent = wrapper.get(
          "[data-test='result-reduced-interest-rate-percent']",
        );

        expect(resultReducedInterestRatePerMonth.text()).toBe("3 609 kr");
        expect(resultReducedInterestRatePerYear.text()).toBe("43 313 kr");
        expect(resultReducedInterestRatePercent.text()).toBe("3,85 %");
      });

      it("reduced reference interest rate", () => {
        const resultReducedReferenceInterestRatePerMonth = wrapper.get(
          "[data-test='result-reduced-reference-interest-rate-per-month']",
        );
        const resultReducedReferenceInterestRatePerYear = wrapper.get(
          "[data-test='result-reduced-reference-interest-rate-per-year']",
        );
        const resultReducedReferenceInterestRatePercent = wrapper.get(
          "[data-test='result-reduced-reference-interest-rate-percent']",
        );

        expect(resultReducedReferenceInterestRatePerMonth.text()).toBe(
          "1 313 kr",
        );
        expect(resultReducedReferenceInterestRatePerYear.text()).toBe(
          "15 750 kr",
        );
        expect(resultReducedReferenceInterestRatePercent.text()).toBe("1,40 %");
      });

      it("minimum total cost", () => {
        const resultMinimumTotalCostPerMonth = wrapper.get(
          "[data-test='result-minimum-total-cost-per-month']",
        );
        const resultMinimumTotalCostPerYear = wrapper.get(
          "[data-test='result-minimum-total-cost-per-year']",
        );
        const resultMinimumTotalCostSummedRates = wrapper.get(
          "[data-test='result-minimum-total-cost-summed-rates']",
        );

        expect(resultMinimumTotalCostPerMonth.text()).toBe("5 484 kr");
        expect(resultMinimumTotalCostPerYear.text()).toBe("65 813 kr");
        expect(resultMinimumTotalCostSummedRates.text()).toBe("3,85 % + 2 %");
      });

      it("delta minimum total cost", () => {
        const resultDeltaMinimumTotalCostPerMonth = wrapper.get(
          "[data-test='result-delta-minimum-total-cost-per-month']",
        );
        const resultDeltaMinimumTotalCostPerYear = wrapper.get(
          "[data-test='result-delta-minimum-total-cost-per-year']",
        );

        expect(resultDeltaMinimumTotalCostPerMonth.text()).toBe("+2 297 kr");
        expect(resultDeltaMinimumTotalCostPerYear.text()).toBe("+27 563 kr");
      });
    });
  });
});
