<script setup lang="ts">
import { Page } from "@/types/types";

const emit = defineEmits<{
  (event: "menu-choice", value: Page): void;
}>();

const props = defineProps<{
  currentPage: Page;
}>();

const menuItemClicked = (page: Page) => {
  emit("menu-choice", page);
};
</script>

<template>
  <header>
    <img
      alt="NNM logo"
      title="NNM logo"
      class="logo"
      src="../assets/LogoNNM_blue_transparent_background.svg"
      width="300"
    />

    <p class="note">
      [This application is intentionally only available in Swedish.]
    </p>
  </header>

  <nav>
    <ul>
      <li
        @click="menuItemClicked(Page.Calculator)"
        :class="{ 'current-page': props.currentPage === Page.Calculator }"
      >
        Lånekalkylator
      </li>

      <li
        @click="menuItemClicked(Page.Documentation)"
        :class="{ 'current-page': props.currentPage === Page.Documentation }"
      >
        Dokumentation
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav ul {
  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  & li {
    border: 1px solid gray;
    border-radius: 1rem;
    padding: 0.3rem 1rem;

    font-weight: bold;

    &.current-page {
      background-color: lightgoldenrodyellow;
    }

    &:not(.current-page):hover {
      cursor: pointer;

      background-color: dodgerblue;
      color: white;
    }
  }
}
</style>
