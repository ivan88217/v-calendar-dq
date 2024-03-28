<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useDatesStore } from "../stores/dates-store";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
    required: true,
  },
  minDate: {
    type: Date,
    default: undefined,
    required: false,
  },
  maxDate: {
    type: Date,
    default: undefined,
    required: false,
  },
});

const minDate = computed(() => props.minDate);
const maxDate = computed(() => props.maxDate);

const datesStore = useDatesStore(props.modelValue as string[]);
const dates = computed(() => datesStore.dates);
const action = computed(() => datesStore.action);

const attributes = ref([
  {
    key: "today",
    highlight: "green",
    dates: dates,
  },
]);

const selectAttribute = computed(() => ({
  highlight:
    action.value === "remove"
      ? {
          style: {
            backgroundColor: "transparent",
          },
          contentStyle: {
            backgroundColor: "transparent",
            color: "black",
          },
        }
      : {
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
}));

const dragAttribute = computed(() => ({
  highlight: {
    style: {
      backgroundColor: "#5fc385",
      color: "white",
    },
    contentStyle: {
      color: "white",
    },
  },
}));

const range = ref();

const timezone = ref("Asia/Taipei");

watchEffect(() => {
  if (!range.value) return;
  const start = range.value.start;
  const end = range.value.end;

  datesStore.selectDates(start, end);
});

const emit = defineEmits(["update:modelValue"]);
watchEffect(() => {
  emit("update:modelValue", dates.value);
});
</script>

<template>
  <VDatePicker
    class="my-calendar"
    :columns="2"
    :attributes="attributes"
    v-model.range="range"
    :select-attribute="selectAttribute"
    :drag-attribute="dragAttribute"
    :timezone="timezone"
    :min-date="minDate"
    :max-date="maxDate"
  >
  </VDatePicker>
</template>

<style>
.my-calendar .vc-weekday-6,
.my-calendar .vc-weekday-7 {
  color: #ff0000;
}
</style>
