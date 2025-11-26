import Lucky from './lucky'
import LuckyScratchConfig from '../types/scratch'
import { UserConfigType } from '../types/index'

export default class LuckyScratch extends Lucky {
  private mask: {
    type?: 'color' | 'image'
    color?: string
    src?: string
    imgObj?: HTMLImageElement
  } = {}
  private scratch: {
    radius: number
    percent: number
  } = {
    radius: 20,
    percent: 0.5
  }
  // 记录当前刮开的比例
  private progress: number = 0
  // 是否正在刮
  private isScratching: boolean = false
  // 是否已完成（刮开达到阈值）
  private isCompleted: boolean = false
  // 是否禁用刮奖
  public disabled: boolean = false
  // 是否是第一次刮动
  private isFirstScratch: boolean = true
  // 事件是否已绑定
  private eventsInitialized: boolean = false
  // 回调函数
  private onceBeforeStartCallback?: () => boolean | Promise<boolean>
  private beforeStartCallback?: () => boolean | Promise<boolean>
  private startCallback?: () => void
  private endCallback?: () => void
  private successCallback?: (progress: number) => void

  /**
   * 刮刮卡构造器
   * @param config 配置项
   * @param data 抽奖数据
   */
  constructor (config: UserConfigType, data: LuckyScratchConfig) {
    super(config, {
      width: data.width || '300px',
      height: data.height || '150px'
    })
    this.initData(data)
    // 首次初始化
    this.init()
  }

  protected initData (data: LuckyScratchConfig): void {
    this.$set(this, 'mask', {
      type: 'color',
      color: '#ccc',
      ...data.mask
    })
    this.$set(this, 'scratch', {
      radius: 20,
      percent: 0.5,
      ...data.scratch
    })
    this.$set(this, 'onceBeforeStartCallback', data.onceBeforeStart)
    this.$set(this, 'beforeStartCallback', data.beforeStart)
    this.$set(this, 'startCallback', data.start)
    this.$set(this, 'endCallback', data.end)
    this.$set(this, 'successCallback', data.success)
  }

  public init (): void {
    this.initLucky()
    // 重置状态
    this.progress = 0
    this.isScratching = false
    this.isCompleted = false
    this.isFirstScratch = true // 重置第一次刮动标志
    this.draw()
    // 绑定事件
    this.handleBindEvents()
  }

  private async draw (): Promise<void> {
    // 触发开始回调
    this.config.beforeInit?.()
    // 清空画布
    this.clearCanvas()
    const { mask, scratch } = this
    // 绘制遮罩
    if (mask.type === 'image' && mask.src) {
      // 如果是图片
      const imgObj = await this.loadImg(mask.src, { src: mask.src })
      this.ctx.drawImage(imgObj, 0, 0, this.boxWidth, this.boxHeight)
    } else {
      // 默认为颜色
      this.ctx.fillStyle = mask.color || '#ccc'
      this.ctx.fillRect(0, 0, this.boxWidth, this.boxHeight)
    }
    // 触发绘制结束回调
    this.config.afterInit?.()
  }

  private handleBindEvents (): void {
    // 防止重复绑定事件
    if (this.eventsInitialized) return
    this.eventsInitialized = true

    const canvas = this.config.canvasElement
    if (!canvas) return
    // 移动端 touch 事件
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      this.handleStart(e.touches[0])
    })
    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault()
      this.handleMove(e.touches[0])
    })
    canvas.addEventListener('touchend', () => {
      this.handleEnd()
    })
    // PC 端 mouse 事件
    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.handleStart(e)
    })
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault()
      this.handleMove(e)
    })
    document.addEventListener('mouseup', () => {
      this.handleEnd()
    })
  }

  private async handleStart (e: MouseEvent | Touch): Promise<void> {
    // 如果已完成或被禁用，不再响应事件
    if (this.isCompleted || this.disabled) return
    
    // 调用 onceBeforeStart 钩子（只在第一次刮动时）
    if (this.isFirstScratch && this.onceBeforeStartCallback) {
      try {
        const result = await this.onceBeforeStartCallback()
        if (result === false) {
          // 校验失败，阻止刮奖
          return
        }
      } catch (err) {
        console.error('onceBeforeStart 回调执行出错:', err)
        return
      }
      // 标记已经不是第一次刮动了
      this.isFirstScratch = false
    }
    
    // 调用 beforeStart 钩子（每次刮动都会调用）
    if (this.beforeStartCallback) {
      try {
        const result = await this.beforeStartCallback()
        if (result === false) {
          // 校验失败，阻止刮奖
          return
        }
      } catch (err) {
        console.error('beforeStart 回调执行出错:', err)
        return
      }
    }
    
    this.isScratching = true
    this.startCallback?.()
    this.drawArc(e)
  }

  private handleMove (e: MouseEvent | Touch): void {
    if (!this.isScratching || this.isCompleted || this.disabled) return
    this.drawArc(e)
  }

  private handleEnd (): void {
    if (!this.isScratching || this.isCompleted || this.disabled) return
    this.isScratching = false
    // 计算刮开比例
    this.checkProgress()
    this.endCallback?.()
  }

  private drawArc (e: MouseEvent | Touch): void {
    const canvas = this.config.canvasElement
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * this.config.dpr
    const y = (e.clientY - rect.top) * this.config.dpr
    
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.scratch.radius * this.config.dpr, 0, Math.PI * 2)
    this.ctx.fill()
    // 恢复混合模式
    this.ctx.globalCompositeOperation = 'source-over'
  }

  private checkProgress (): void {
    try {
      const imageData = this.ctx.getImageData(0, 0, this.boxWidth * this.config.dpr, this.boxHeight * this.config.dpr)
      const pixels = imageData.data
      let count = 0
      for (let i = 0; i < pixels.length; i += 4) {
        // alpha 通道小于 128 认为已刮开
        if (pixels[i + 3] < 128) {
          count++
        }
      }
      this.progress = count / (pixels.length / 4)
      // 如果达到阈值
      if (this.progress >= this.scratch.percent) {
        this.isCompleted = true // 标记为已完成
        this.clearCanvas() // 自动全部刮开
        this.successCallback?.(this.progress)
      }
    } catch (err) {
      // 可能会遇到跨域图片污染画布的问题
      console.error('无法计算刮开进度，可能是因为图片跨域:', err)
    }
  }
}

