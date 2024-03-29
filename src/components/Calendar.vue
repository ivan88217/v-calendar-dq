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
  readonly: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const minDate = computed(() => props.minDate);
const maxDate = computed(() => props.maxDate);
const readonly = computed(() => props.readonly);
const clicked = ref(0);

const datesStore = useDatesStore(props.modelValue as string[]);
const dates = computed(() => datesStore.dates);

const attributes = ref([
  {
    key: "today",
    highlight: "green",
    dates: dates,
  },
]);

const selectAttribute = computed(() => ({
  highlight: {
    style: {
      backgroundColor: "transparent",
      color: "black",
    },
    contentStyle: {
      backgroundColor: "transparent",
      color: "black",
    },
  },
}));

const dragAttribute = computed(() => ({
  highlight: {
    style: {
      backgroundColor: readonly.value ? "transparent" : "#5fc385",
      color: readonly.value ? "black" : "white",
    },
    contentStyle: {
      color: readonly.value ? "black" : "white",
    },
  },
}));

const range = ref();

const timezone = ref("Asia/Taipei");

watchEffect(() => {
  if (readonly.value) return;

  if (!range.value) return;
  const start = range.value.start;
  const end = range.value.end;

  datesStore.selectDates(start, end);
});

const handleDayClick = () => {
  if (++clicked.value % 2 === 0) {
    range.value = {
      ...range.value,
    }
  }
};

const emit = defineEmits(["update:modelValue"]);
watchEffect(() => {
  emit("update:modelValue", dates.value);
});
</script>

<template>
  <VDatePicker
    class="my-calendar"
    :class="readonly ? 'disabled-calendar' : ''"
    :columns="2"
    :attributes="attributes"
    v-model.range="range"
    :select-attribute="selectAttribute"
    :drag-attribute="dragAttribute"
    :timezone="timezone"
    :min-date="minDate"
    :max-date="maxDate"
    @dayclick="handleDayClick"
  >
  </VDatePicker>
</template>

<style>
.my-calendar .vc-weekday-6,
.my-calendar .vc-weekday-7 {
  color: #ff0000;
}

.disabled-calendar {
  pointer-events: none;
  opacity: 0.5;
}
</style>
