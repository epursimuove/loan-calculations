<script setup lang="ts">
import {computed, type ComputedRef, ref, watch} from "vue";
import type { Ref } from "vue";
import {
  amountFormatter,
  displayPercentage,
  displayPercentage2,
} from "@/composables/useCalculations";

import type { LoanDetailsDto } from "@/types/types";

const props = defineProps<{
  loanDetails: LoanDetailsDto;
}>();

const emit = defineEmits<{
  (event: "change", value: LoanDetailsDto): void;
}>();

const factorMSEK = 1e6;
const amountInMSEK: Ref<number> = ref(props.loanDetails.amount / factorMSEK);

const loanDetails: Ref<LoanDetailsDto> = ref(props.loanDetails);

const validateLoanConfiguration:
    ComputedRef<{ "out-of-bounds-warning": boolean }> =
    computed(() => {
      const validRange =
          0 <= loanDetails.value.loanInPercent &&
          loanDetails.value.loanInPercent <= 85;
      
      return {
        "out-of-bounds-warning": !validRange
      };
    });

// console.log('loanDetails.value', loanDetails.value);

watch(amountInMSEK, () => {
  // console.log('Amount changed', amountInMSEK.value);
  loanDetails.value.amount = amountInMSEK.value * factorMSEK;
});

watch(
  [loanDetails],
  () => {
    // console.log('Emit change loanDetails.value', loanDetails.value);
    emit("change", loanDetails.value);
  },
  {
    deep: true,
  },
);
</script>

<template>
  <form>
    <div class="checkbox-section">
      <div>
        <input
          id="useReferenceInterestRate"
          type="checkbox"
          v-model="loanDetails.useReferenceInterestRate"
        />

        <label
          for="useReferenceInterestRate"
          title="Använd referensräntan för att beräkna jämförelser"
        >
          Referensränta
        </label>
      </div>

      <div>
        <input
          id="useTaxReduction"
          type="checkbox"
          v-model="loanDetails.useTaxReduction"
        />

        <label for="useTaxReduction" title="Räkna även ut skattereduktion">
          Skattereduktion
        </label>
      </div>

      <div>
        <input id="useYear" type="checkbox" v-model="loanDetails.useYear" />

        <label for="useYear" title="Visa kostnader per år"> År </label>
      </div>

      <div>
        <input
          id="displayChart"
          type="checkbox"
          v-model="loanDetails.displayChart"
        />

        <label for="displayChart" title="Visa diagram"> Diagram </label>
      </div>
    </div>

    <div>
      <label for="amount" title="Priset/värdet för bostaden"> Pris MSEK </label>

      <input
        id="amount"
        v-model.number="amountInMSEK"
        type="number"
        step="0.1"
        min="0"
        max="100"
      />

      <span class="number" data-test="configured-amount-in-MSEK">
        {{ amountFormatter.format(amountInMSEK * 1000000) }}
      </span>
    </div>

    <div>
      <label for="interestRate">Ränta %</label>

      <input
        id="interestRate"
        v-model.number="loanDetails.interestRate"
        type="number"
        step="0.25"
        min="0"
        max="20"
      />

      <span class="number" data-test="configured-interest-rate">
        {{ displayPercentage2(2)(loanDetails.interestRate) }}
      </span>
    </div>

    <div :class="validateLoanConfiguration">
      <label for="loanInPercent">Lån %</label>

      <input
        id="loanInPercent"
        v-model.number="loanDetails.loanInPercent"
        type="number"
        step="5"
        min="0"
        max="85"
        autofocus
      />

      <span class="number" data-test="configured-loan-in-percent">
        {{ displayPercentage(loanDetails.loanInPercent) }}
      </span>
    </div>

    <div v-if="loanDetails.useReferenceInterestRate">
      <label for="referenceInterestRate">Referensränta %</label>

      <input
        id="referenceInterestRate"
        v-model.number="loanDetails.referenceInterestRate"
        type="number"
        step="0.25"
        min="0"
        max="20"
      />

      <span class="number" data-test="configured-reference-interest-rate">
        {{ displayPercentage2(2)(loanDetails.referenceInterestRate) }}
      </span>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: lightgoldenrodyellow;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 1rem;
  margin-bottom: 2rem;

  > div {
    /*margin: 1rem 0;*/
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: flex-start;
    
    &.out-of-bounds-warning {
      color: rgb(255, 0, 0);
      > label::after, span::after {
        content: " ❗️";
      }
    }
  }

  > div:not(.checkbox-section) {
    display: grid;
    grid-template-columns: 8rem 5rem auto;
  }

  @media (max-width: 450px) {
    > .checkbox-section {
      flex-direction: column;
      gap: 0.5rem;
    }

    > div:not(.checkbox-section) {
      grid-template-columns: 5rem auto;
      grid-row-gap: 0.2rem;

      > label {
        grid-column: 1 / -1;
        grid-row: 1;
      }

      > input {
        grid-column: 1 / 2;
        grid-row: 2;
      }

      > span {
        grid-column: 2 / -1;
        grid-row: 2;
      }
    }
  }
}
</style>
