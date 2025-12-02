import { defineComponent } from 'vue-demi'
import { LuckyScratch } from 'lucky-scratch'
import h from '../utils/h-demi'
// @ts-ignore
import { name, version } from '../../package.json'

export default defineComponent({
  name: 'LuckyScratch',
  props: {
    width: {
      type: [String, Number],
      default: '300px',
    },
    height: {
      type: [String, Number],
      default: '150px',
    },
    mask: {
      type: Object,
      default: () => ({
        type: 'color',
        color: '#ccc',
      }),
    },
    scratch: {
      type: Object,
      default: () => ({
        radius: 20,
        percent: 0.5,
      }),
    },
  },
  emits: [
    'once-before-start',
    'before-start',
    'start',
    'end',
    'success',
    'ready', // 新增：初始化完成事件
    'error',
    'finally',
  ],
  watch: {
    mask(newData) {
      if (this.lucky) {
        ;(this.lucky as any).mask = newData
        this.init()
      }
    },
    scratch(newData) {
      if (this.lucky) {
        ;(this.lucky as any).scratch = newData
      }
    },
  },
  data() {
    return {
      lucky: null as LuckyScratch | null,
    }
  },
  mounted() {
    // 添加版本信息到标签上, 方便定位版本问题
    if (this.$refs.myLucky) {
      const dom = this.$refs.myLucky as HTMLDivElement
      dom.setAttribute('package', `${name}@${version}`)
    }
    // 开始创建组件
    try {
      this.initLucky()
    } catch (err) {
      this.$emit('error', err)
    } finally {
      this.$emit('finally')
    }
  },
  methods: {
    initLucky() {
      this.lucky = new LuckyScratch(
        {
          flag: 'WEB',
          divElement: this.$refs.myLucky as HTMLDivElement,
          rAF: window.requestAnimationFrame,
          setTimeout: window.setTimeout,
          setInterval: window.setInterval,
          clearTimeout: window.clearTimeout,
          clearInterval: window.clearInterval,
        },
        {
          width: this.width,
          height: this.height,
          mask: this.mask,
          scratch: this.scratch,
          onceBeforeStart: async () => {
            // 检查是否有监听器，如果没有则自动通过
            // @ts-ignore - Vue 3 的 $attrs 包含事件监听器信息
            if (!this.$attrs['onOnceBeforeStart']) {
              return true // 没有监听器，默认允许
            }
            // 触发 Vue 事件，让父组件处理
            const result = await new Promise((resolve) => {
              this.$emit('once-before-start', resolve)
            })
            return result !== false
          },
          beforeStart: async () => {
            // 检查是否有监听器，如果没有则自动通过
            // @ts-ignore
            if (!this.$attrs['onBeforeStart']) {
              return true // 没有监听器，默认允许
            }
            const result = await new Promise((resolve) => {
              this.$emit('before-start', resolve)
            })
            return result !== false
          },
          start: () => {
            this.$emit('start')
          },
          end: () => {
            this.$emit('end')
          },
          success: (progress) => {
            this.$emit('success', progress)
          },
          afterInit: () => {
            this.$emit('ready')
          },
        }
      )
    },
    /**
     * init 方法可以重新初始化刮刮卡
     */
    init() {
      this.lucky && this.lucky.init()
    },
  },
  render() {
    return h('div', { ref: 'myLucky' })
  },
})
