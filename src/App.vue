<script setup lang="ts">
import PageFooter from "./components/PageFooter.vue";
import InputForm from "./components/InputForm.vue";
import ResultDashboard from "./components/ResultDashboard.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import type { LoanDetailsDto } from "@/types/types";
import ResultChart from "@/components/ResultChart.vue";
import PageHeader from "@/components/PageHeader.vue";
import { Page } from "@/types/types";

const loanDetails: Ref<LoanDetailsDto> = ref({
  useReferenceInterestRate: true,
  useTaxReduction: true,
  useYear: true,
  displayChart: true,
  amount: 1_500_000,
  referenceInterestRate: 5.75,
  interestRate: 4.5,
  loanInPercent: 85,
});

const inputChanged = (updatedLoanDetails: LoanDetailsDto): void => {
  // console.log("event", event);

  loanDetails.value = updatedLoanDetails;
};

const currentPage: Ref<Page> = ref(Page.Calculator);

const handleMenuChoice = (page: Page) => {
  currentPage.value = page;
};
</script>

<template>
  <PageHeader :current-page="currentPage" @menu-choice="handleMenuChoice" />

  <main>
    <section v-show="currentPage === Page.Calculator">
      <h1>Bolånekalkylator</h1>

      <InputForm :loan-details="loanDetails" @change="inputChanged" />

      <ResultDashboard :loan-details="loanDetails" />

      <ResultChart :loan-details="loanDetails" />
    </section>

    <section v-show="currentPage === Page.Documentation">
      <h1>Analysera kostnader för bolån i Sverige</h1>

      <p>
        Denna kalkylator hjälper er att räkna på och analysera olika kostnader
        kring bolån för privatbostäder i Sverige.
      </p>

      <h2>Regler bolån</h2>

      <p>
        Reglerna för <a href="https://www.compricer.se/bolan">bolån</a> i
        Sverige är för närvarande:
      </p>

      <ul>
        <li>Man kan maximalt låna 85 procent av bostadens värde.</li>
        <li>
          Upp till och med 50 procent, har man endast <em>räntekostnader</em>.
        </li>
        <li>
          Lånar man mer än 50 procent, så ska man även <em>amortera</em> 1
          procent.
        </li>
        <li>
          Ifall man lånar mer än 70 procent ska man
          <em>amortera</em> ytterligare 1 procent.
        </li>
        <li>
          Ifall lånebeloppet (för samtliga era lån) överstiger 4.5 gånger er (års)bruttolön kan ni behöva amortera ytterligare 1 procent.
        </li>
      </ul>

      <h2>Regler skattereduktion</h2>

      <p>För skattereduktion gäller:</p>

      <ul>
        <li>
          Man kan <em>eventuellt</em> få skattereduktion på maximalt 30 procent
          av räntekostnaden upp till 100 000 kr. Över detta belopp kan man
          <em>eventuellt</em> få skattereduktion på 21 procent.

          <ul>
            <li>
              Observera att skattereduktionen av räntekostnaden i kalkylen är
              beräknad med maximala 30 procent.
            </li>
          </ul>
        </li>

        <li>Amorteringen reduceras självklart inte.</li>
      </ul>

      <h2>Övrigt</h2>

      <p>Belopp är avrundade till hela kronor.</p>

      <p>
        Referensräntan används för att göra jämförelser. Den kan till exempel
        motsvara din nuvarande ränta, erbjuden ränta eller kalkylerad ränta.
      </p>

      <h2>Om</h2>

      <p>
        Eftersom alla bolånekalkyler jag hittills sett har vissa brister, så
        fick jag skapa mig en egen, för att se till att all information som jag
        anser är viktig och intressant visas på ett lättförståeligt och
        pedagogiskt sätt. Ibland har man nytta av att vara programmerare.
      </p>

      <p>
        Kalkylatorn skapades i november 2022, är
        <strong>reviderad i juli 2024</strong>, och används självklart på
        egen risk. Som alltid, när det gäller analysverktyg och kalkylatorer som
        innehåller formulär, tabeller och diagram, så fungerar även denna bättre
        på större skärmstorlekar.
      </p>

      <p>
        Tips på förbättringar och eventuella felaktigheter mottages tacksamt.
      </p>
    </section>
  </main>

  <PageFooter />
</template>

<style scoped>
header {
  margin: 1rem 0;
  line-height: 1.5;
}
</style>
