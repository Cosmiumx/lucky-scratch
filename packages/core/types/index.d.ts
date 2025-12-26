type ImgType = HTMLImageElement | HTMLCanvasElement;
type ImgItemType = {
    src: string;
    top?: string | number;
    left?: string | number;
    width?: string;
    height?: string;
    formatter?: (img: ImgType) => ImgType;
    $resolve?: Function;
    $reject?: Function;
};
type ConfigType = {
    nodeType?: number;
    flag: 'WEB' | 'MP-WX' | 'UNI-H5' | 'UNI-MP' | 'TARO-H5' | 'TARO-MP';
    el?: string;
    divElement?: HTMLDivElement;
    canvasElement?: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dpr: number;
    handleCssUnit?: (num: number, unit: string) => number;
    rAF?: Function;
    setTimeout: Function;
    setInterval: Function;
    clearTimeout: Function;
    clearInterval: Function;
    beforeCreate?: Function;
    beforeResize?: Function;
    afterResize?: Function;
    beforeInit?: Function;
    afterInit?: Function;
    beforeDraw?: Function;
    afterDraw?: Function;
    afterStart?: Function;
};
type UserConfigType = Partial<ConfigType>;
type Tuple<T, Len extends number, Res extends T[] = []> = Res['length'] extends Len ? Res : Tuple<T, Len, [...Res, T]>;

interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}

declare class Lucky {
    static version: string;
    protected readonly version: string;
    protected readonly config: ConfigType;
    protected readonly ctx: CanvasRenderingContext2D;
    protected htmlFontSize: number;
    protected rAF: Function;
    protected boxWidth: number;
    protected boxHeight: number;
    protected data: {
        width: string | number;
        height: string | number;
    };
    /**
     * 公共构造器
     * @param config
     */
    constructor(config: string | HTMLDivElement | UserConfigType, data: {
        width: string | number;
        height: string | number;
    });
    /**
     * 初始化组件大小/单位
     */
    protected resize(): void;
    /**
     * 初始化方法
     */
    protected initLucky(): void;
    /**
     * 鼠标点击事件
     * @param e 事件参数
     */
    protected handleClick(e: MouseEvent): void;
    /**
     * 根标签的字体大小
     */
    protected setHTMLFontSize(): void;
    clearCanvas(): void;
    /**
     * 设备像素比
     * window 环境下自动获取, 其余环境手动传入
     */
    protected setDpr(): void;
    /**
     * 重置盒子和canvas的宽高
     */
    private resetWidthAndHeight;
    /**
     * 根据 dpr 缩放 canvas 并处理位移
     */
    protected zoomCanvas(): void;
    /**
     * 从 window 对象上获取一些方法
     */
    private initWindowFunction;
    isWeb(): boolean;
    /**
     * 异步加载图片并返回图片的几何信息
     * @param src 图片路径
     * @param info 图片信息
     */
    protected loadImg(src: string, info: ImgItemType, resolveName?: string): Promise<ImgType>;
    /**
     * 公共绘制图片的方法
     * @param imgObj 图片对象
     * @param rectInfo: [x轴位置, y轴位置, 渲染宽度, 渲染高度]
     */
    protected drawImage(ctx: CanvasRenderingContext2D, imgObj: ImgType, ...rectInfo: [...Tuple<number, 4>, ...Partial<Tuple<number, 4>>]): void;
    /**
     * 计算图片的渲染宽高
     * @param imgObj 图片标签元素
     * @param imgInfo 图片信息
     * @param maxWidth 最大宽度
     * @param maxHeight 最大高度
     * @return [渲染宽度, 渲染高度]
     */
    protected computedWidthAndHeight(imgObj: ImgType, imgInfo: ImgItemType, maxWidth: number, maxHeight: number): [number, number];
    /**
     * 转换单位
     * @param { string } value 将要转换的值
     * @param { number } denominator 分子
     * @return { number } 返回新的字符串
     */
    protected changeUnits(value: string, denominator?: number): number;
    /**
     * 获取长度
     * @param length 将要转换的长度
     * @param maxLength 最大长度
     * @return 返回长度
     */
    protected getLength(length: string | number | undefined, maxLength?: number): number;
    /**
     * 获取相对(居中)X坐标
     * @param width
     * @param col
     */
    protected getOffsetX(width: number, maxWidth?: number): number;
    protected getOffscreenCanvas(width: number, height: number): {
        _offscreenCanvas: HTMLCanvasElement;
        _ctx: CanvasRenderingContext2D;
    } | void;
    /**
     * 添加一个新的响应式数据 (临时)
     * @param data 数据
     * @param key 属性
     * @param value 新值
     */
    $set(data: object, key: string | number, value: any): void;
    /**
     * 添加一个属性计算 (临时)
     * @param data 源数据
     * @param key 属性名
     * @param callback 回调函数
     */
    protected $computed(data: object, key: string, callback: Function): void;
    /**
     * 添加一个观察者 create user watcher
     * @param expr 表达式
     * @param handler 回调函数
     * @param watchOpt 配置参数
     * @return 卸载当前观察者的函数 (暂未返回)
     */
    protected $watch(expr: string | Function, handler: Function | WatchOptType, watchOpt?: WatchOptType): Function;
}

interface LuckyScratchConfig {
    width?: string | number;
    height?: string | number;
    mask?: {
        type?: 'color' | 'image';
        color?: string;
        src?: string;
    };
    scratch?: {
        radius?: number;
        percent?: number;
    };
    onceBeforeStart?: () => boolean | Promise<boolean>;
    beforeStart?: () => boolean | Promise<boolean>;
    start?: () => void;
    end?: () => void;
    success?: (progress: number) => void;
    afterInit?: () => void;
}

declare class LuckyScratch extends Lucky {
    private mask;
    private scratch;
    private progress;
    private isScratching;
    private isCompleted;
    disabled: boolean;
    private isFirstScratch;
    private eventsInitialized;
    private onceBeforeStartCallback?;
    private beforeStartCallback?;
    private startCallback?;
    private endCallback?;
    private successCallback?;
    private afterInitCallback?;
    /**
     * 刮刮卡构造器
     * @param config 配置项
     * @param data 抽奖数据
     */
    constructor(config: UserConfigType, data: LuckyScratchConfig);
    protected initData(data: LuckyScratchConfig): void;
    /**
     * 重写 resize 方法，在尺寸变化后重新绘制蒙层
     */
    protected resize(): void;
    init(): Promise<void>;
    private draw;
    private handleBindEvents;
    private handleStart;
    private handleMove;
    private handleEnd;
    private drawArc;
    /**
     * 在指定坐标绘制刮痕
     * @param x 相对于 canvas 的 x 坐标（物理像素，已乘以 dpr）
     * @param y 相对于 canvas 的 y 坐标（物理像素，已乘以 dpr）
     */
    private drawArcAt;
    private checkProgress;
    /**
     * 动态设置禁用状态
     * @param disabled 是否禁用
     */
    setDisabled(disabled: boolean): void;
    /**
     * 公共方法：处理触摸/鼠标开始事件
     * 供小程序、uni-app 等非 DOM 环境使用
     * @param x 相对于 canvas 的 x 坐标（逻辑像素）
     * @param y 相对于 canvas 的 y 坐标（逻辑像素）
     */
    handleTouchStart(x: number, y: number): Promise<void>;
    /**
     * 公共方法：处理触摸/鼠标移动事件
     * 供小程序、uni-app 等非 DOM 环境使用
     * @param x 相对于 canvas 的 x 坐标（逻辑像素）
     * @param y 相对于 canvas 的 y 坐标（逻辑像素）
     */
    handleTouchMove(x: number, y: number): void;
    /**
     * 公共方法：处理触摸/鼠标结束事件
     * 供小程序、uni-app 等非 DOM 环境使用
     */
    handleTouchEnd(): void;
}

/**
 * 切割圆角
 * @param img 将要裁剪的图片对象
 * @param radius 裁剪的圆角半径
 * @returns 返回一个离屏 canvas 用于渲染
 */
declare const cutRound: (img: ImgType, radius: number) => ImgType;
/**
 * 透明度
 * @param img 将要处理的图片对象
 * @param opacity 透明度
 * @returns 返回一个离屏 canvas 用于渲染
 */
declare const opacity: (img: ImgType, opacity: number) => ImgType;

export { LuckyScratch, cutRound, opacity };
