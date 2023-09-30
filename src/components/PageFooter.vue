<script setup lang="ts">
import { version } from "vue";
import { appVersion } from "@/composables/useCalculations";
import { Chart } from "chart.js/auto";

const now: number = Date.now();

const dateTimeFormatYearOnly: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  "sv-SE",
  {
    timeZone: "UTC",
    year: "numeric",
  },
);

const currentYear: string = dateTimeFormatYearOnly.format(now);

const loadedTimestamp: string = new Date(now).toISOString();

const buildTimestamp: string =
  document
    .getElementById("buildTimestamp")
    ?.getAttribute("datetime")
    ?.slice(0, 16) + "Z";
</script>

<template>
  <footer>
    <div>
      <strong>NNM Loan calculator</strong> <var>{{ appVersion }}</var>
    </div>
    <div>
      App built
      <a href="https://anders.nemonisimors.com/currentTime">{{
        buildTimestamp
      }}</a>.
    </div>
    <div>
      <a href="https://github.com/epursimuove/loan-calculations">Source code</a> at GitHub.
    </div>
    <div>
      Implemented with <a href="https://vuejs.org">Vue</a> <var>{{ version }}</var> and <a href="https://chartjs.org">Chart.js</a> <var>{{ Chart.version }}</var>
    </div>
    <div>
      Page loaded
      <a href="https://anders.nemonisimors.com/currentTime">{{
        loadedTimestamp
      }}</a>.
    </div>
    <div>
      Copyright &copy; 2022-{{ currentYear }}
      <a href="https://anders.nemonisimors.com">Anders Gustafson</a>. All rights reserved.
    </div>
    <div>
      <a href="https://www.nemonisimors.com">
        <em>Nemo nisi mors</em>
      </a>
    </div>

    <div>
      <img
        alt="NNM logo"
        title="NNM logo"
        class="logo"
        src="../assets/LogoNNM_blue_transparent_background.svg"
        width="100"
      />
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 4rem;
  border-top: 1px solid gray;
  color: var(--color-footer);
  font-size: 0.7em;
}
</style>
