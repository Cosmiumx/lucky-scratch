import React from 'react'
import { LuckyScratch as Scratch } from 'lucky-canvas'
import { name, version } from '../../package.json'

export default class LuckyScratch extends React.Component {
  constructor (props) {
    super(props)
    this.myLucky = React.createRef()
    this.lucky = undefined
  }
  componentDidMount () {
    // 当前已经有实例时，不再进行，解决在`react18 + strictMode`下组件componentDidMount会被触发两次的问题
    if (this.lucky) {
      return
    }
    this.myLucky.current.setAttribute('package', `${name}@${version}`)
    try {
      this.initLucky()
    } catch (err) {
      this.props.onError && this.props.onError(err)
    } finally {
      this.props.onFinally && this.props.onFinally()
    }
  }
  componentDidUpdate (prevProps) {
    if (!this.lucky) return
    if (this.props.width !== prevProps.width) {
      this.lucky.width = this.props.width
    }
    if (this.props.height !== prevProps.height) {
      this.lucky.height = this.props.height
    }
    if (JSON.stringify(this.props.mask) !== JSON.stringify(prevProps.mask)) {
      this.lucky.mask = this.props.mask
      this.init()
    }
    if (JSON.stringify(this.props.scratch) !== JSON.stringify(prevProps.scratch)) {
      this.lucky.scratch = this.props.scratch
    }
  }
  initLucky () {
    this.lucky = new Scratch({
      flag: 'WEB',
      divElement: this.myLucky.current,
      rAF: window.requestAnimationFrame,
      setTimeout: window.setTimeout,
      setInterval: window.setInterval,
      clearTimeout: window.clearTimeout,
      clearInterval: window.clearInterval,
    }, {
      width: this.props.width,
      height: this.props.height,
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
      start: (...rest) => {
        this.props.onStart && this.props.onStart(...rest)
      },
      end: (...rest) => {
        this.props.onEnd && this.props.onEnd(...rest)
      },
      success: (progress) => {
        this.props.onSuccess && this.props.onSuccess(progress)
      },
      afterInit: () => {
        this.props.onReady && this.props.onReady()
      },
    })
  }
  init (...rest) {
    this.lucky && this.lucky.init(...rest)
  }
  setDisabled (disabled) {
    this.lucky && this.lucky.setDisabled(disabled)
  }
  render () {
    return <div ref={this.myLucky}></div>
  }
}

LuckyScratch.defaultProps = {
  width: '300px',
  height: '150px',
  mask: {
    type: 'color',
    color: '#ccc',
  },
  scratch: {
    radius: 20,
    percent: 0.5,
  },
}

