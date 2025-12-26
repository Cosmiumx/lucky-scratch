import { LuckyScratch } from 'lucky-scratch'
import { changeUnits, resolveImage } from '../utils'

Component({
  properties: {
    width: { type: String, value: '600rpx' },
    height: { type: String, value: '400rpx' },
    mask: {
      type: Object,
      value: {
        type: 'color',
        color: '#ccc'
      }
    },
    scratch: {
      type: Object,
      value: {
        radius: 20,
        percent: 0.5
      }
    }
  },
  data: {
    lucky: null,
    isShow: false,
  },
  observers: {
    'mask.**': function (newData, oldData) {
      if (this.lucky) {
        this.lucky.mask = newData
        this.lucky.init()
      }
    },
    'scratch.**': function (newData, oldData) {
      if (this.lucky && this.dpr) {
        // 因为使用了 ctx.scale(dpr, dpr)，而核心库内部会将半径乘以 dpr
        // 导致双重放大，所以这里先除以 dpr 抵消
        this.lucky.scratch = {
          ...newData,
          radius: newData.radius / this.dpr
        }
      } else if (this.lucky) {
        // 如果 dpr 还没初始化，直接赋值（这种情况很少见）
        this.lucky.scratch = newData
      }
    },
  },
  ready () {
    console.log('LuckyScratch 123:', LuckyScratch)
    wx.createSelectorQuery().in(this).select('#lucky-scratch').fields({
      node: true, size: true
    }).exec((res) => {
      if (!res[0] || !res[0].node) {
        return console.error('lucky-scratch 获取不到 canvas 标签')
      }
      const canvas = this.canvas = res[0].node
      const dpr = this.dpr = wx.getSystemInfoSync().pixelRatio
      const ctx = this.ctx = canvas.getContext('2d')
      const data = this.data
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      // 参考 Taro 和 UniApp 实现：小程序端需要 ctx.scale
      ctx.scale(dpr, dpr)
      this.lucky = new LuckyScratch({
        flag: 'MP-WX',
        ctx,
        dpr,
        offscreenCanvas: wx.createOffscreenCanvas({ type: '2d', width: 300, height: 150 }),
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        unitFunc: (num, unit) => changeUnits(num + unit),
        afterStart: () => {
          this.lucky.draw()
        }
      }, {
        width: res[0].width,
        height: res[0].height,
        mask: data.mask,
        scratch: {
          ...data.scratch,
          // 因为使用了 ctx.scale(dpr, dpr)，而核心库内部会将半径乘以 dpr
          // 导致双重放大，所以这里先除以 dpr 抵消
          radius: data.scratch.radius / dpr
        },
        onceBeforeStart: async () => {
          // 小程序环境下，如果没有监听器，Promise 会一直等待
          // 参考 React/Taro 的实现，设置超时自动通过
          const result = await Promise.race([
            new Promise((resolve) => {
              this.triggerEvent('once-before-start', { resolve })
            }),
            new Promise((resolve) => {
              // 如果 50ms 内没有响应，说明没有监听器，自动通过
              setTimeout(() => resolve(true), 50)
            })
          ])
          return result !== false
        },
        beforeStart: async () => {
          // 小程序环境下，如果没有监听器，Promise 会一直等待
          // 参考 React/Taro 的实现，设置超时自动通过
          const result = await Promise.race([
            new Promise((resolve) => {
              this.triggerEvent('before-start', { resolve })
            }),
            new Promise((resolve) => {
              // 如果 50ms 内没有响应，说明没有监听器，自动通过
              setTimeout(() => resolve(true), 50)
            })
          ])
          return result !== false
        },
        start: () => {
          this.triggerEvent('start')
        },
        end: () => {
          this.triggerEvent('end')
        },
        success: (progress) => {
          this.triggerEvent('success', { progress })
        },
        afterInit: () => {
          this.triggerEvent('ready')
        }
      })
      // 为了保证 onload 回调准确
      this.setData({ isShow: true })
    })
  },
  methods: {
    imgBindload (e) {
      const { name, index } = e.currentTarget.dataset
      const img = this.data[name]
      if (img && img.src) {
        resolveImage(e, img, this.canvas)
      }
    },
    init (...rest) {
      this.lucky && this.lucky.init(...rest)
    },
    setDisabled (disabled) {
      this.lucky && this.lucky.setDisabled(disabled)
    },
    handleTouchStart (e) {
      if (!this.lucky) return
      const touch = e.touches[0]
      // 实时获取 canvas 位置，计算相对于 canvas 的坐标
      const query = wx.createSelectorQuery().in(this)
      query.select('#lucky-scratch').boundingClientRect((rect) => {
        if (!rect) return
        // 计算相对于 canvas 的坐标（逻辑像素）
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        // 因为使用了 ctx.scale(dpr, dpr)，而核心库内部会再乘以 dpr
        // 导致双重放大，所以这里先除以 dpr 抵消
        this.lucky.handleTouchStart(x / this.dpr, y / this.dpr)
      })
      query.exec()
    },
    handleTouchMove (e) {
      if (!this.lucky) return
      const touch = e.touches[0]
      // 实时获取 canvas 位置，计算相对于 canvas 的坐标
      const query = wx.createSelectorQuery().in(this)
      query.select('#lucky-scratch').boundingClientRect((rect) => {
        if (!rect) return
        // 计算相对于 canvas 的坐标（逻辑像素）
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        // 因为使用了 ctx.scale(dpr, dpr)，而核心库内部会再乘以 dpr
        // 导致双重放大，所以这里先除以 dpr 抵消
        this.lucky.handleTouchMove(x / this.dpr, y / this.dpr)
      })
      query.exec()
    },
    handleTouchEnd () {
      if (!this.lucky) return
      // 调用核心库暴露的公共方法
      this.lucky.handleTouchEnd()
    }
  },
})
