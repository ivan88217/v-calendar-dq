import { defineStore } from 'pinia'
import { ref } from 'vue'
import { format, eachDayOfInterval } from "date-fns";

export const useDatesStore = (initDates: string[] = []) => defineStore('dates', () => {
    const dates = ref<string[]>(initDates);
    const action = ref<'add' | 'remove'>('add');

    function addDate(date: string | Date) {
        const dateString = typeof date === 'string' ? date : format(date, "yyyy-MM-dd");

        if (dates.value.includes(dateString)) {
            return;
        }
        dates.value.push(dateString);
    }

    function addDates(startDate: string | Date, endDate: string | Date) {
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

        const dateRange = eachDayOfInterval({ start, end })
            .map(date => format(date, "yyyy-MM-dd"));

        dates.value = Array.from(new Set([...dates.value, ...dateRange]));
    }

    function removeDate(date: string | Date) {
        const dateString = typeof date === 'string' ? date : format(date, "yyyy-MM-dd");
        dates.value = dates.value.filter(d => d !== dateString);
    }

    function removeDates(startDate: string | Date, endDate: string | Date) {
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

        const dateRange = eachDayOfInterval({ start, end })
            .map(date => format(date, "yyyy-MM-dd"));

        dates.value = dates.value.filter(d => !dateRange.includes(d));
    }

    function xorDates(startDate: string | Date, endDate: string | Date) {
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

        const dateRange = eachDayOfInterval({ start, end })
            .map(date => format(date, "yyyy-MM-dd"));

        dates.value = dates.value.filter(d => !dateRange.includes(d))
            .concat(dateRange.filter(d => !dates.value.includes(d)));
    }

    function selectDates(startDate: string | Date, endDate: string | Date) {
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

        const isStartSelected = dates.value.includes(format(start, "yyyy-MM-dd"));
        const isEndSelected = dates.value.includes(format(end, "yyyy-MM-dd"));

        if (isStartSelected && isEndSelected) {
            action.value = 'remove';
            removeDates(start, end);
        } else {
            action.value = 'add';
            addDates(start, end);
        }
    }

    return { dates, action, addDate, addDates, removeDate, removeDates, xorDates, selectDates }
})();
