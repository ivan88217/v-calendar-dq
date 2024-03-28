export declare const useDatesStore: (initDates?: string[]) => import("pinia").Store<"dates", import("pinia")._UnwrapAll<Pick<{
    dates: import("vue").Ref<string[]>;
    action: import("vue").Ref<"add" | "remove">;
    addDate: (date: string | Date) => void;
    addDates: (startDate: string | Date, endDate: string | Date) => void;
    removeDate: (date: string | Date) => void;
    removeDates: (startDate: string | Date, endDate: string | Date) => void;
    xorDates: (startDate: string | Date, endDate: string | Date) => void;
    selectDates: (startDate: string | Date, endDate: string | Date) => void;
}, "dates" | "action">>, Pick<{
    dates: import("vue").Ref<string[]>;
    action: import("vue").Ref<"add" | "remove">;
    addDate: (date: string | Date) => void;
    addDates: (startDate: string | Date, endDate: string | Date) => void;
    removeDate: (date: string | Date) => void;
    removeDates: (startDate: string | Date, endDate: string | Date) => void;
    xorDates: (startDate: string | Date, endDate: string | Date) => void;
    selectDates: (startDate: string | Date, endDate: string | Date) => void;
}, never>, Pick<{
    dates: import("vue").Ref<string[]>;
    action: import("vue").Ref<"add" | "remove">;
    addDate: (date: string | Date) => void;
    addDates: (startDate: string | Date, endDate: string | Date) => void;
    removeDate: (date: string | Date) => void;
    removeDates: (startDate: string | Date, endDate: string | Date) => void;
    xorDates: (startDate: string | Date, endDate: string | Date) => void;
    selectDates: (startDate: string | Date, endDate: string | Date) => void;
}, "addDate" | "addDates" | "removeDate" | "removeDates" | "xorDates" | "selectDates">>;
