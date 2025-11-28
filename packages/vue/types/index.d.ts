import * as vue_demi from 'vue-demi';
import { LuckyWheel, LuckyGrid, SlotMachine, LuckyScratch } from 'lucky-canvas';

declare const _default$4: vue_demi.DefineComponent<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    buttons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {
    lucky: LuckyWheel | null;
}, {}, {
    initLucky(): void;
    init(): void;
    play(): void;
    stop(index?: number): void;
}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, ("start" | "end" | "success" | "error" | "finally")[], "start" | "end" | "success" | "error" | "finally", vue_demi.PublicProps, Readonly<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    buttons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onStart?: ((...args: any[]) => any) | undefined;
    onEnd?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onFinally?: ((...args: any[]) => any) | undefined;
}>, {
    blocks: unknown[];
    prizes: unknown[];
    buttons: unknown[];
    defaultStyle: Record<string, any>;
    defaultConfig: Record<string, any>;
}, {}, {}, {}, string, vue_demi.ComponentProvideOptions, true, {}, any>;

declare const _default$3: vue_demi.DefineComponent<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    cols: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rows: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    buttons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    button: {
        type: ObjectConstructor;
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    activeStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {
    lucky: LuckyGrid | null;
}, {}, {
    initLucky(): void;
    init(): void;
    play(): void;
    stop(index?: number): void;
}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, ("start" | "end" | "success" | "error" | "finally")[], "start" | "end" | "success" | "error" | "finally", vue_demi.PublicProps, Readonly<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    cols: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rows: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    buttons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    button: {
        type: ObjectConstructor;
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    activeStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onStart?: ((...args: any[]) => any) | undefined;
    onEnd?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onFinally?: ((...args: any[]) => any) | undefined;
}>, {
    cols: string | number;
    rows: string | number;
    blocks: unknown[];
    prizes: unknown[];
    buttons: unknown[];
    defaultStyle: Record<string, any>;
    activeStyle: Record<string, any>;
    defaultConfig: Record<string, any>;
}, {}, {}, {}, string, vue_demi.ComponentProvideOptions, true, {}, any>;

declare const _default$2: vue_demi.DefineComponent<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    slots: {
        type: ArrayConstructor;
        default: () => never[];
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {
    lucky: SlotMachine | null;
}, {}, {
    initLucky(): void;
    init(): void;
    play(): void;
    stop(index: number): void;
}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.PublicProps, Readonly<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    blocks: {
        type: ArrayConstructor;
        default: () => never[];
    };
    prizes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    slots: {
        type: ArrayConstructor;
        default: () => never[];
    };
    defaultStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    defaultConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    blocks: unknown[];
    prizes: unknown[];
    slots: unknown[];
    defaultStyle: Record<string, any>;
    defaultConfig: Record<string, any>;
}, {}, {}, {}, string, vue_demi.ComponentProvideOptions, true, {}, any>;

declare const _default$1: vue_demi.DefineComponent<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    mask: {
        type: ObjectConstructor;
        default: () => {
            type: string;
            color: string;
        };
    };
    scratch: {
        type: ObjectConstructor;
        default: () => {
            radius: number;
            percent: number;
        };
    };
}>, {}, {
    lucky: LuckyScratch | null;
}, {}, {
    initLucky(): void;
    init(): void;
}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, ("once-before-start" | "before-start" | "start" | "end" | "success" | "ready" | "error" | "finally")[], "once-before-start" | "before-start" | "start" | "end" | "success" | "ready" | "error" | "finally", vue_demi.PublicProps, Readonly<vue_demi.ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    mask: {
        type: ObjectConstructor;
        default: () => {
            type: string;
            color: string;
        };
    };
    scratch: {
        type: ObjectConstructor;
        default: () => {
            radius: number;
            percent: number;
        };
    };
}>> & Readonly<{
    "onOnce-before-start"?: ((...args: any[]) => any) | undefined;
    "onBefore-start"?: ((...args: any[]) => any) | undefined;
    onStart?: ((...args: any[]) => any) | undefined;
    onEnd?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onFinally?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    height: string | number;
    mask: Record<string, any>;
    scratch: Record<string, any>;
}, {}, {}, {}, string, vue_demi.ComponentProvideOptions, true, {}, any>;

declare const install: (app: {
    component: Function;
}) => void;

declare const _default: {
    install: (app: {
        component: Function;
    }) => void;
};

export { _default$3 as LuckyGrid, _default$1 as LuckyScratch, _default$4 as LuckyWheel, _default$2 as SlotMachine, _default as default, install };
