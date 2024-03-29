<script setup lang="ts">
import { ref } from "vue";
import Calendar from "./components/Calendar.vue";

const dates = ref(["2022-01-01", "2022-01-02", "2022-01-03"]);
</script>

<template>
  <Calendar v-model="dates" :readonly="false" />
</template>

