declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
        required: true;
    };
    minDate: {
        type: DateConstructor;
        default: undefined;
        required: false;
    };
    maxDate: {
        type: DateConstructor;
        default: undefined;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
        required: true;
    };
    minDate: {
        type: DateConstructor;
        default: undefined;
        required: false;
    };
    maxDate: {
        type: DateConstructor;
        default: undefined;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: unknown[];
    minDate: Date;
    maxDate: Date;
}, {}>;
export default _default;
