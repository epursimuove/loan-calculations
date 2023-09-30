import { Chart } from "chart.js/auto";
import {
  decimalOneFractionDigitFormatter,
  displayPercentage2,
} from "@/composables/useCalculations";

const getContext = (canvasElementId: string): HTMLCanvasElement =>
  document.getElementById(canvasElementId) as HTMLCanvasElement;

const percentage: (percentageValue: number) => string = displayPercentage2(2);

export type ChartData = {
  labels: string[];
  datasets: { label: string; data: number[] }[];
};

export type FirstChartContent = {
  labels: string[];
  monthlyInstallmentCosts: number[];
  monthlyInterestCosts: number[];
};

export type SecondChartContent = {
  labels: string[];
  cashPerAmount: number[];
  loanPerAmount: number[];
};

export type ChartConfiguration = {
  data: ChartData;
  title: string;
  xTitle: string;
  yTitle: string;
};

export const createDataForFirstChart = (
  content: FirstChartContent,
): ChartData => {
  return {
    labels: content.labels,
    datasets: [
      {
        label: "Amortering",
        data: content.monthlyInstallmentCosts,
        // backgroundColor: "red",
      },
      {
        label: "Ränta",
        data: content.monthlyInterestCosts,
        // backgroundColor: "blue",
      },
    ],
  };
};

export const createDataForSecondChart = (
  content: SecondChartContent,
): ChartData => {
  return {
    labels: content.labels,
    datasets: [
      {
        label: "Insats",
        data: content.cashPerAmount,
        // backgroundColor: "red",
      },
      {
        label: "Lån",
        data: content.loanPerAmount,
        // backgroundColor: "blue",
      },
    ],
  };
};

export const createTitleXForFirstChart = (
  interestRate: number,
  referenceInterestRate: number,
): string => {
  return (
    `Närliggande räntesatser kring vald räntesats (${percentage(
      interestRate,
    )}).` +
    (referenceInterestRate >= 0
      ? ` Referensränta (${percentage(
          referenceInterestRate,
        )}) längst till höger.`
      : "")
  );
};

export const createTitleXForSecondChart = (amount: number): string => {
  const priceInMSEK: string = decimalOneFractionDigitFormatter.format(
    amount / 1_000_000,
  );

  return `Närliggande priser kring valt pris (${priceInMSEK} MSEK).`;
};

export const createHeaderTitleForSecondChart = (
  loanInPercent: number,
): string => {
  return `Insats och lån vid olika bostadspriser när du lånar ${displayPercentage2(
    0,
  )(loanInPercent)}`;
};

export const createTotalCostDifferentInterestRatesChart = (
  chartConfiguration: ChartConfiguration,
): Chart => {
  // console.log("Create chart");

  const context = getContext("chart-total-cost-different-interest-rates");

  return new Chart(context, {
    type: "bar",
    data: chartConfiguration.data,
    options: {
      responsive: true,
      animation: false,
      plugins: {
        title: {
          display: true,
          text: chartConfiguration.title,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: chartConfiguration.xTitle,
          },
          stacked: true,
        },
        y: {
          title: {
            display: true,
            text: chartConfiguration.yTitle,
          },
          stacked: true,
        },
      },
    },
  });
};

export const createCashVsLoanForDifferentPricesChart = (
  chartConfiguration: ChartConfiguration,
): Chart => {
  // console.log("Create chart");

  const context = getContext("chart-cash-vs-loan-for-different-prices");

  return new Chart(context, {
    type: "bar",
    data: chartConfiguration.data,
    options: {
      responsive: true,
      animation: false,
      plugins: {
        title: {
          display: true,
          text: chartConfiguration.title,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: chartConfiguration.xTitle,
          },
          // stacked: true,
        },
        y: {
          title: {
            display: true,
            text: chartConfiguration.yTitle,
          },
          // stacked: true,
        },
      },
    },
  });
};

export const updateChartWithNewValues = (
  chart: Chart,
  chartConfiguration: ChartConfiguration,
) => {
  chart.data = chartConfiguration.data;

  if (chart.options?.plugins?.title) {
    chart.options.plugins.title.text = chartConfiguration.title;
  }

  // @ts-ignore
  chart.options.scales.x.title.text = chartConfiguration.xTitle;
  // @ts-ignore
  chart.options.scales.y.title.text = chartConfiguration.yTitle;

  chart.update();
};
