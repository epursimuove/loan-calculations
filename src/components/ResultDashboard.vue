<script setup lang="ts">
import {
  amountDifferenceFormatter,
  amountFormatter,
  displayPercentage,
  displayPercentage2,
} from "@/composables/useCalculations";
import { computed } from "vue";
import { type LoanDetailsDto } from "@/types/types";

const props = defineProps<{
  loanDetails: LoanDetailsDto;
}>();

// console.log("props", props);

const loan = computed(
  () => (props.loanDetails.amount * props.loanDetails.loanInPercent) / 100,
);
const cash = computed(() => props.loanDetails.amount - loan.value);
const loanPercentage = computed(() => props.loanDetails.loanInPercent);
const cashPercentage = computed(() => 100 - loanPercentage.value);

const installmentPercent = computed(() =>
  props.loanDetails.loanInPercent > 70
    ? 2
    : props.loanDetails.loanInPercent > 50
    ? 1
    : 0,
);

const installmentCostPerYear = computed(
  () => (loan.value * installmentPercent.value) / 100,
);

const rateCostPerYear = computed(
  () => (loan.value * props.loanDetails.interestRate) / 100,
);
const referenceRateCostPerYear = computed(
  () => (loan.value * props.loanDetails.referenceInterestRate) / 100,
);

const totalCostPerYear = computed(
  () => rateCostPerYear.value + installmentCostPerYear.value,
);

const referenceTotalCostPerYear = computed(
  () => referenceRateCostPerYear.value + installmentCostPerYear.value,
);

const minimumCostPerYear = computed(
  () => rateCostPerYear.value * 0.7 + installmentCostPerYear.value,
);

const referenceMinimumCostPerYear = computed(
  () => referenceRateCostPerYear.value * 0.7 + installmentCostPerYear.value,
);

const taxReductionPerYear = computed(() => rateCostPerYear.value * 0.3);

const referenceTaxReductionPerYear = computed(
  () => referenceRateCostPerYear.value * 0.3,
);

const yearDiffTotal = computed(
  () => totalCostPerYear.value - referenceTotalCostPerYear.value,
);

const yearDiffMinimum = computed(
  () => minimumCostPerYear.value - referenceMinimumCostPerYear.value,
);

const onePercentOfLoanPerYear = computed(() => loan.value / 100);

const plusMinusCss = (value: number) => {
  return {
    increase: value > 0,
    decrease: value < 0,
  };
};

const yearToMonth = (amount: number) => amount / 12;

const displayWithSign = (value: number) => {
  if (Number.isNaN(value)) {
    return "";
  }
  return amountDifferenceFormatter.format(value);
};
</script>

<template>
  <div class="calculator">
    <table>
      <tbody class="form">
        <tr>
          <th>Pris</th>
          <td class="number" data-test="result-amount">
            {{ amountFormatter.format(props.loanDetails.amount) }}
          </td>
        </tr>

        <tr>
          <th>Insats</th>
          <td class="number" data-test="result-cash">
            {{ amountFormatter.format(cash) }}
          </td>
          <td class="number" data-test="result-cash-percent">
            {{ displayPercentage(cashPercentage) }}
          </td>
        </tr>

        <tr>
          <th>Lån</th>
          <td class="number important" data-test="result-loan">
            {{ amountFormatter.format(loan) }}
          </td>
          <td class="number" data-test="result-loan-percent">
            {{ displayPercentage(loanPercentage) }}
          </td>
        </tr>
      </tbody>

      <tbody class="divider"></tbody>

      <tbody class="result">
        <tr>
          <th></th>
          <th>Månad</th>
          <th>År</th>
        </tr>

        <tr
          :title="`Motsvarar en (1) procentenhets ränteändring på lånebeloppet (${amountFormatter.format(
            loan,
          )})`"
        >
          <th>1 %-enhet av lån</th>
          <td class="number" data-test="result-one-percent-of-loan-per-month">
            {{ amountFormatter.format(yearToMonth(onePercentOfLoanPerYear)) }}
          </td>
          <td class="number" data-test="result-one-percent-of-loan-per-year">
            {{ amountFormatter.format(onePercentOfLoanPerYear) }}
          </td>
        </tr>

        <tr class="divider"></tr>

        <tr>
          <th>Amortering</th>
          <td class="number" data-test="result-installment-cost-per-month">
            {{ amountFormatter.format(yearToMonth(installmentCostPerYear)) }}
          </td>
          <td class="number" data-test="result-installment-cost-per-year">
            {{ amountFormatter.format(installmentCostPerYear) }}
          </td>
          <td class="number" data-test="result-installment-percent">
            {{ displayPercentage(installmentPercent) }}
          </td>
        </tr>

        <tr class="divider"></tr>

        <tr class="interest-rate-related">
          <th>Ränta</th>
          <td
            class="number important"
            data-test="result-interest-rate-per-month"
          >
            {{ amountFormatter.format(yearToMonth(rateCostPerYear)) }}
          </td>
          <td
            class="number important"
            data-test="result-interest-rate-per-year"
          >
            {{ amountFormatter.format(rateCostPerYear) }}
          </td>
          <td class="number important" data-test="result-interest-rate">
            {{ displayPercentage2(2)(props.loanDetails.interestRate) }}
          </td>
        </tr>

        <tr
          v-if="props.loanDetails.useReferenceInterestRate"
          class="reference-data"
        >
          <th>Referensränta</th>
          <td
            class="number"
            data-test="result-reference-interest-rate-per-month"
          >
            {{ amountFormatter.format(yearToMonth(referenceRateCostPerYear)) }}
          </td>
          <td
            class="number"
            data-test="result-reference-interest-rate-per-year"
          >
            {{ amountFormatter.format(referenceRateCostPerYear) }}
          </td>
          <td class="number" data-test="result-reference-interest-rate">
            {{ displayPercentage2(2)(props.loanDetails.referenceInterestRate) }}
          </td>
        </tr>

        <tr class="really">
          <th title="Totalkostnad innan eventuell skattereduktion">
            Totalkostnad
          </th>
          <td class="number important" data-test="result-total-cost-per-month">
            {{ amountFormatter.format(yearToMonth(totalCostPerYear)) }}
          </td>
          <td class="number important" data-test="result-total-cost-per-year">
            {{ amountFormatter.format(totalCostPerYear) }}
          </td>
          <td
            class="number important"
            data-test="result-total-cost-summed-rates"
          >
            {{ displayPercentage2(2)(props.loanDetails.interestRate) }}
            +
            {{ displayPercentage(installmentPercent) }}
          </td>
        </tr>

        <tr v-if="props.loanDetails.useReferenceInterestRate">
          <th title="Jämförelse mot referensräntans totalkostnad">
            &Delta; totalkostnad
          </th>
          <td
            class="number important"
            :class="plusMinusCss(yearToMonth(yearDiffTotal))"
            data-test="result-delta-total-cost-per-month"
          >
            {{ displayWithSign(yearToMonth(yearDiffTotal)) }}
          </td>
          <td
            class="number important"
            :class="plusMinusCss(yearDiffTotal)"
            data-test="result-delta-total-cost-per-year"
          >
            {{ displayWithSign(yearDiffTotal) }}
          </td>
        </tr>

        <tr class="divider"></tr>

        <tr
          v-if="props.loanDetails.useTaxReduction"
          class="interest-rate-related"
          title="30% av räntekostnaden"
        >
          <th>Skattereduktion</th>
          <td class="number" data-test="result-tax-reduction-per-month">
            {{ displayWithSign(-yearToMonth(taxReductionPerYear)) }}
          </td>
          <td class="number" data-test="result-tax-reduction-per-year">
            {{ displayWithSign(-taxReductionPerYear) }}
          </td>
          <td class="number" data-test="result-tax-reduction-percent">
            {{ displayPercentage2(2)(props.loanDetails.interestRate * 0.3) }}
          </td>
        </tr>

        <tr
          v-if="props.loanDetails.useTaxReduction"
          class="interest-rate-related"
          title="Räntekostnad efter bästa möjliga skattereduktion"
        >
          <th>Reducerad ränta</th>
          <td
            class="number important"
            data-test="result-reduced-interest-rate-per-month"
          >
            {{
              amountFormatter.format(
                yearToMonth(rateCostPerYear - taxReductionPerYear),
              )
            }}
          </td>
          <td
            class="number important"
            data-test="result-reduced-interest-rate-per-year"
          >
            {{ amountFormatter.format(rateCostPerYear - taxReductionPerYear) }}
          </td>
          <td
            class="number important"
            data-test="result-reduced-interest-rate-percent"
          >
            {{ displayPercentage2(2)(props.loanDetails.interestRate * 0.7) }}
          </td>
        </tr>

        <tr
          v-if="
            props.loanDetails.useTaxReduction &&
            props.loanDetails.useReferenceInterestRate
          "
          title="Referensräntekostnad efter bästa möjliga skattereduktion"
          class="reference-data"
        >
          <th>Reducerad ref.ränta</th>
          <td
            class="number"
            data-test="result-reduced-reference-interest-rate-per-month"
          >
            {{
              amountFormatter.format(
                yearToMonth(
                  referenceRateCostPerYear - referenceTaxReductionPerYear,
                ),
              )
            }}
          </td>
          <td
            class="number"
            data-test="result-reduced-reference-interest-rate-per-year"
          >
            {{
              amountFormatter.format(
                referenceRateCostPerYear - referenceTaxReductionPerYear,
              )
            }}
          </td>
          <td
            class="number"
            data-test="result-reduced-reference-interest-rate-percent"
          >
            {{
              displayPercentage2(2)(
                props.loanDetails.referenceInterestRate * 0.7,
              )
            }}
          </td>
        </tr>

        <tr
          v-if="props.loanDetails.useTaxReduction"
          class="really"
          title="Totalkostnad efter bästa möjliga skattereduktion"
        >
          <th>Minsta kostnad</th>
          <td
            class="number important"
            data-test="result-minimum-total-cost-per-month"
          >
            {{ amountFormatter.format(yearToMonth(minimumCostPerYear)) }}
          </td>
          <td
            class="number important"
            data-test="result-minimum-total-cost-per-year"
          >
            {{ amountFormatter.format(minimumCostPerYear) }}
          </td>
          <td
            class="number important"
            data-test="result-minimum-total-cost-summed-rates"
          >
            {{ displayPercentage2(2)(props.loanDetails.interestRate * 0.7) }}
            +
            {{ displayPercentage(installmentPercent) }}
          </td>
        </tr>

        <tr
          v-if="
            props.loanDetails.useTaxReduction &&
            props.loanDetails.useReferenceInterestRate
          "
        >
          <th title="Jämförelse mot referensräntans minsta kostnad">
            &Delta; minsta kostnad
          </th>
          <td
            class="number important"
            :class="plusMinusCss(yearToMonth(yearDiffMinimum))"
            data-test="result-delta-minimum-total-cost-per-month"
          >
            {{ displayWithSign(yearToMonth(yearDiffMinimum)) }}
          </td>
          <td
            class="number important"
            :class="plusMinusCss(yearDiffMinimum)"
            data-test="result-delta-minimum-total-cost-per-year"
          >
            {{ displayWithSign(yearDiffMinimum) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.calculator {
  overflow-x: auto;

  margin-bottom: 3rem;
}

table {
  border-collapse: collapse;
  white-space: nowrap;
}

tbody.divider {
  height: 2rem;
}

tr.divider {
  height: 1rem;
}

th {
  text-align: right;
}

th:first-child {
  min-width: 10rem;
}

td {
  padding-left: 0;
  text-align: right;
  min-width: 9rem;
}

.really {
  background-color: lightyellow;
}

.important {
  font-weight: bold;
}

.reference-data {
  color: #aaaaaa;
}

.increase {
  color: red;
}

.decrease {
  color: darkseagreen;
}

.interest-rate-related {
  color: slateblue;
}
</style>
