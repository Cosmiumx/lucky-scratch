import { ImgItemType } from './index'

export default interface LuckyScratchConfig {
  width?: string | number
  height?: string | number
  mask?: {
    type?: 'color' | 'image'
    color?: string
    src?: string
  }
  scratch?: {
    radius?: number
    percent?: number
  }
  onceBeforeStart?: () => boolean | Promise<boolean>
  beforeStart?: () => boolean | Promise<boolean>
  start?: () => void
  end?: () => void
  success?: (progress: number) => void
  afterInit?: () => void  // 初始化完成后的回调（canvas 绘制完成）
}

