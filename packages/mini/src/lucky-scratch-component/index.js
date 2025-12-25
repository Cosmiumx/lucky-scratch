import { LuckyScratch } from 'lucky-scratch'
import { changeUnits, resolveImage, getImage } from '../utils'

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
    luckyImg: '',
    showCanvas: true,
  },
  observers: {
    'mask.**': function (newData, oldData) {
      if (this.lucky) {
        this.lucky.mask = newData
        this.lucky.init()
      }
    },
    'scratch.**': function (newData, oldData) {
      this.lucky && (this.lucky.scratch = newData)
    },
  },
  ready() {
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
          // 隐藏图片并显示canvas
          this.lucky.draw()
          this.setData({
            luckyImg: '',
            showCanvas: true
          })
        }
      }, {
        width: res[0].width,
        height: res[0].height,
        mask: data.mask,
        scratch: data.scratch,
        onceBeforeStart: async () => {
          const result = await new Promise((resolve) => {
            this.triggerEvent('once-before-start', { resolve })
          })
          return result !== false
        },
        beforeStart: async () => {
          console.log('beforeStart compose:')
          const result = await new Promise((resolve) => {
            this.triggerEvent('before-start', { resolve })
          })
          return result !== false
        },
        start: () => {
          console.log('Start compose:')
          this.triggerEvent('start')
        },
        end: () => {
          this.triggerEvent('end')
        },
        success: (progress) => {
          this.triggerEvent('success', { progress })
          getImage.call(this).then(res => {
            this.setData({ luckyImg: res.tempFilePath })
          })
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
    imgBindload(e) {
      const { name, index } = e.currentTarget.dataset
      const img = this.data[name]
      if (img && img.src) {
        resolveImage(e, img, this.canvas)
      }
    },
    luckyImgLoad() {
      this.setData({ showCanvas: false })
      this.lucky.clearCanvas()
    },
    init(...rest) {
      this.lucky && this.lucky.init(...rest)
    },
    setDisabled(disabled) {
      this.lucky && this.lucky.setDisabled(disabled)
    }
  },
})

