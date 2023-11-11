<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { computed, type ComputedRef, onMounted, watch } from "vue";
import { type LoanDetailsDto } from "@/types/types";
import {
  decimalOneFractionDigitFormatter,
  displayPercentage2,
} from "@/composables/useCalculations";
import {
  createTotalCostDifferentInterestRatesChart,
  createCashVsLoanForDifferentPricesChart,
  createDataForFirstChart,
  createTitleXForFirstChart,
  type FirstChartContent,
  type ChartConfiguration,
  createDataForSecondChart,
  type SecondChartContent,
  createHeaderTitleForSecondChart,
  createTitleXForSecondChart,
  updateChartWithNewValues,
} from "@/composables/useChart";

const props = defineProps<{
  loanDetails: LoanDetailsDto;
}>();

const addReferenceInterestRate: ComputedRef<boolean> = computed(
  () => props.loanDetails.useReferenceInterestRate,
);

const chartDataTotalCostDifferentInterestRates: ComputedRef<FirstChartContent> =
  computed(() => {
    // console.log("Computing chart data");

    const { amount, interestRate, loanInPercent, referenceInterestRate } =
      props.loanDetails;

    const loanAmount = (amount * loanInPercent) / 100;

    const installmentPercent =
      loanInPercent > 70 ? 2 : loanInPercent > 50 ? 1 : 0;
    const installmentCost =
      amount * (loanInPercent / 100) * (installmentPercent / 100);
    const monthlyInstallmentCost = installmentCost / 12;

    const labels: string[] = [];
    const monthlyInterestCosts: number[] = [];
    const monthlyInstallmentCosts: number[] = [];
    const numberOfBarsPerSide = 4;
    for (let i = -numberOfBarsPerSide; i <= numberOfBarsPerSide; i++) {
      const percentage = interestRate + i * 0.25;
      const label = `${displayPercentage2(2)(percentage)}`;
      labels.push(label);

      const monthlyInterestCost = (loanAmount * percentage) / 100 / 12;
      monthlyInterestCosts.push(Math.round(monthlyInterestCost));

      monthlyInstallmentCosts.push(Math.round(monthlyInstallmentCost));
    }

    if (addReferenceInterestRate.value) {
      labels.push("");
      labels.push(`${displayPercentage2(2)(referenceInterestRate)}`);

      monthlyInterestCosts.push(0);
      const monthlyReferenceInterestCost =
        (loanAmount * referenceInterestRate) / 100 / 12;
      monthlyInterestCosts.push(Math.round(monthlyReferenceInterestCost));

      monthlyInstallmentCosts.push(0);
      monthlyInstallmentCosts.push(Math.round(monthlyInstallmentCost));
    }

    return {
      labels,
      monthlyInstallmentCosts,
      monthlyInterestCosts,
    };
  });

const chartDataCashVsLoanDifferentPrices: ComputedRef<SecondChartContent> =
  computed(() => {
    // console.log("Computing chart data");

    const { amount, loanInPercent } = props.loanDetails;

    const labels: string[] = [];
    const cashPerAmount: number[] = [];
    const loanPerAmount: number[] = [];
    const numberOfBarsPerSide = 4;
    for (let i = -numberOfBarsPerSide; i <= numberOfBarsPerSide; i++) {
      const currentAmount = amount + i * 100_000;
      const label = `${decimalOneFractionDigitFormatter.format(
        currentAmount / 1_000_000,
      )} MSEK`;
      labels.push(label);

      const currentCash = (currentAmount * (100 - loanInPercent)) / 100;
      cashPerAmount.push(Math.round(currentCash));
      // console.log('cashPerAmount', cashPerAmount);

      const currentLoan = (currentAmount * loanInPercent) / 100;
      loanPerAmount.push(Math.round(currentLoan));
      // console.log('loanPerAmount', loanPerAmount);
    }

    return {
      labels,
      cashPerAmount,
      loanPerAmount,
    };
  });

const updateCharts = (): void => {
  const chartConfigurationFirst: ChartConfiguration = {
    data: createDataForFirstChart(
      chartDataTotalCostDifferentInterestRates.value,
    ),
    title: "Lånets totalkostnad per månad vid olika räntesatser",
    xTitle: createTitleXForFirstChart(
      props.loanDetails.interestRate,
      props.loanDetails.referenceInterestRate,
    ),
    yTitle: "Amortering plus ränta per månad (SEK)",
  };

  const chartConfigurationSecond: ChartConfiguration = {
    data: createDataForSecondChart(chartDataCashVsLoanDifferentPrices.value),
    title: createHeaderTitleForSecondChart(props.loanDetails.loanInPercent),
    xTitle: createTitleXForSecondChart(props.loanDetails.amount),
    yTitle: "Belopp i SEK",
  };

  if (charts.length === 0) {
    charts[0] = createTotalCostDifferentInterestRatesChart(
      chartConfigurationFirst,
    );

    charts[1] = createCashVsLoanForDifferentPricesChart(
      chartConfigurationSecond,
    );
  } else {
    updateChartWithNewValues(charts[0], chartConfigurationFirst);

    updateChartWithNewValues(charts[1], chartConfigurationSecond);
  }
};

watch(
  [
    chartDataTotalCostDifferentInterestRates,
    chartDataCashVsLoanDifferentPrices,
  ],
  () => {
    // console.log("CHANGING");

    updateCharts();
  },
);

let charts: Chart[] = [];

onMounted(() => {
  // console.log("onMounted");

  updateCharts();
});
</script>

<template>
  <div id="chart-section">
    <div id="chart-container" v-show="loanDetails.displayChart">
      <canvas id="chart-total-cost-different-interest-rates"> </canvas>

      <canvas id="chart-cash-vs-loan-for-different-prices"> </canvas>
    </div>
  </div>
</template>

<style scoped>
#chart-section {
  margin-bottom: 3rem;
}

#chart-container {
  background-color: white;
  width: 100%;
}

canvas {
  margin-top: 2rem;
  margin-bottom: 4rem;
}
</style>
