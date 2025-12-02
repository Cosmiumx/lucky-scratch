<template>
  <view class="lucky-scratch">
    <canvas
      v-if="showCanvas"
      type="2d"
      id="lucky-scratch"
      :style="{ width, height }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></canvas>
  </view>
</template>

<script>
import { LuckyScratch } from 'lucky-scratch'
import { changeUnits, resolveImage } from './utils'

export default {
  name: 'LuckyScratch',
  props: {
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '150px'
    },
    mask: {
      type: Object,
      default: () => ({
        type: 'color',
        color: '#ccc'
      })
    },
    scratch: {
      type: Object,
      default: () => ({
        radius: 20,
        percent: 0.5
      })
    }
  },
  data() {
    return {
      lucky: null,
      showCanvas: true
    }
  },
  watch: {
    mask: {
      handler(newVal) {
        if (this.lucky) {
          this.lucky.mask = newVal
          this.init()
        }
      },
      deep: true
    },
    scratch: {
      handler(newVal) {
        if (this.lucky) {
          this.lucky.scratch = newVal
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initLucky()
  },
  methods: {
    initLucky() {
      uni.createSelectorQuery()
        .in(this)
        .select('#lucky-scratch')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0] || !res[0].node) {
            return console.error('lucky-scratch 获取不到 canvas 标签')
          }
          const canvas = res[0].node
          const dpr = uni.getSystemInfoSync().pixelRatio
          const ctx = canvas.getContext('2d')
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)

          this.lucky = new LuckyScratch(
            {
              flag: 'UNI-H5',
              ctx,
              dpr,
              setTimeout,
              clearTimeout,
              setInterval,
              clearInterval,
              unitFunc: (num, unit) => changeUnits(num + unit)
            },
            {
              width: res[0].width,
              height: res[0].height,
              mask: this.mask,
              scratch: this.scratch,
              onceBeforeStart: async () => {
                const result = await new Promise((resolve) => {
                  this.$emit('once-before-start', resolve)
                })
                return result !== false
              },
              beforeStart: async () => {
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
              }
            }
          )
        })
    },
    init() {
      this.lucky && this.lucky.init()
    },
    setDisabled(disabled) {
      this.lucky && this.lucky.setDisabled(disabled)
    },
    handleTouchStart(e) {
      // 处理触摸事件
    },
    handleTouchMove(e) {
      // 处理触摸移动事件
    },
    handleTouchEnd(e) {
      // 处理触摸结束事件
    }
  }
}
</script>

<style scoped>
.lucky-scratch {
  display: inline-block;
}
</style>

