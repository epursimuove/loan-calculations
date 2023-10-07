<script setup lang="ts">
import { ref, watch } from "vue";
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
    <div class="one-liner">
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

      <input
        id="useTaxReduction"
        type="checkbox"
        v-model="loanDetails.useTaxReduction"
      />

      <label for="useTaxReduction" title="Räkna även ut skattereduktion">
        Skattereduktion
      </label>
      
      <input
        id="useYear"
        type="checkbox"
        v-model="loanDetails.useYear"
      />

      <label for="useYear" title="Visa kostnader per år">
        År
      </label>
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

    <div>
      <label for="loanInPercent">Lån %</label>

      <input
        id="loanInPercent"
        v-model.number="loanDetails.loanInPercent"
        type="range"
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
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 1rem;
  margin-bottom: 2rem;
}

form div {
  /*margin: 1rem 0;*/
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
}

form div * {
  flex: 0 0 auto;
}

form div:not(.one-liner) label {
  width: 8rem;
}

form div:not(.one-liner) input {
  width: 5rem;
}

form div.one-liner {
  gap: 0.3rem;
}

form div.one-liner input:not(:first-child) {
  margin-left: 2rem;
}
</style>
