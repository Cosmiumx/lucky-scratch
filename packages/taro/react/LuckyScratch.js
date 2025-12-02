import Taro from '@tarojs/taro'
import React from 'react'
import { Canvas } from '@tarojs/components'
import { LuckyScratch } from 'lucky-scratch'
import { changeUnits } from '../utils'

export default class LuckyScratchTaro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCanvas: true
    }
    this.lucky = null
  }

  componentDidMount() {
    this.initLucky()
  }

  componentDidUpdate(prevProps) {
    if (!this.lucky) return
    if (JSON.stringify(this.props.mask) !== JSON.stringify(prevProps.mask)) {
      this.lucky.mask = this.props.mask
      this.init()
    }
    if (JSON.stringify(this.props.scratch) !== JSON.stringify(prevProps.scratch)) {
      this.lucky.scratch = this.props.scratch
    }
  }

  initLucky() {
    const query = Taro.createSelectorQuery()
    query.select('#lucky-scratch').fields({ node: true, size: true }).exec((res) => {
      if (!res[0] || !res[0].node) {
        return console.error('lucky-scratch 获取不到 canvas 标签')
      }
      const canvas = res[0].node
      const dpr = Taro.getSystemInfoSync().pixelRatio
      const ctx = canvas.getContext('2d')
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      this.lucky = new LuckyScratch(
        {
          flag: 'TARO',
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
          mask: this.props.mask,
          scratch: this.props.scratch,
          onceBeforeStart: async () => {
            if (this.props.onOnceBeforeStart) {
              const result = await new Promise((resolve) => {
                this.props.onOnceBeforeStart(resolve)
              })
              return result !== false
            }
            return true
          },
          beforeStart: async () => {
            if (this.props.onBeforeStart) {
              const result = await new Promise((resolve) => {
                this.props.onBeforeStart(resolve)
              })
              return result !== false
            }
            return true
          },
          start: () => {
            this.props.onStart && this.props.onStart()
          },
          end: () => {
            this.props.onEnd && this.props.onEnd()
          },
          success: (progress) => {
            this.props.onSuccess && this.props.onSuccess(progress)
          },
          afterInit: () => {
            this.props.onReady && this.props.onReady()
          }
        }
      )
    })
  }

  init() {
    this.lucky && this.lucky.init()
  }

  setDisabled(disabled) {
    this.lucky && this.lucky.setDisabled(disabled)
  }

  render() {
    const { width = '300px', height = '150px' } = this.props
    return (
      <Canvas
        type="2d"
        id="lucky-scratch"
        style={{ width, height }}
      />
    )
  }
}

LuckyScratchTaro.defaultProps = {
  width: '300px',
  height: '150px',
  mask: {
    type: 'color',
    color: '#ccc'
  },
  scratch: {
    radius: 20,
    percent: 0.5
  }
}

