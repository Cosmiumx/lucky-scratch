import * as vue_demi from 'vue-demi';
import { LuckyScratch } from 'lucky-scratch';

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

export { _default$1 as LuckyScratch, _default as default, install };
