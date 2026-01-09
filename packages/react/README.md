
<div align="center">
  <img src="https://unpkg.com/cosmium@0.0.1/images/other/lucky-scratch-logo.png" width="128" alt="logo" />
  <h1>lucky-scratch 刮刮卡插件</h1>
  <p>一个基于 JavaScript 的跨平台刮刮卡抽奖插件</p>
  <p>
    <a href="https://github.com/Cosmiumx/lucky-scratch/stargazers" target="_black">
      <img src="https://img.shields.io/github/stars/Cosmiumx/lucky-scratch?color=%23ffba15&logo=github&style=flat-square" alt="stars" />
    </a>
    <a href="https://github.com/Cosmiumx/lucky-scratch/network/members" target="_black">
      <img src="https://img.shields.io/github/forks/Cosmiumx/lucky-scratch?color=%23ffba15&logo=github&style=flat-square" alt="forks" />
    </a>
    <a href="https://github.com/Cosmiumx" target="_black">
      <img src="https://img.shields.io/badge/Author-%20Cosmiumx%20-7289da.svg?&logo=github&style=flat-square" alt="author" />
    </a>
    <a href="https://github.com/Cosmiumx/lucky-scratch/blob/master/LICENSE" target="_black">
      <img src="https://img.shields.io/github/license/Cosmiumx/lucky-scratch?color=%232dce89&logo=github&style=flat-square" alt="license" />
    </a>
  </p>
</div>

<div align="center">
  <img src="https://unpkg.com/cosmium@0.0.1/images/other/lucky-scratch.gif" alt="lucky-scratch demo" />
</div>

<br />

## 安装

```bash
npm install @lucky-scratch/react
# 或
yarn add @lucky-scratch/react
```

<br />

## 快速开始

### 函数组件示例（推荐）

```jsx
import React, { useRef } from 'react'
import { LuckyScratch } from '@lucky-scratch/react'

function App() {
  const scratchRef = useRef(null)

  const handleSuccess = (progress) => {
    console.log('刮开进度:', progress)
    alert('恭喜中奖！')
  }

  const reset = () => {
    scratchRef.current?.init()
  }

  return (
    <div className="scratch-wrapper">
      {/* 奖品内容 */}
      <div className="prize-content">🎉 恭喜中奖！</div>
      
      {/* 刮刮卡组件 */}
      <LuckyScratch
        ref={scratchRef}
        width="300px"
        height="200px"
        mask={{ type: 'color', color: '#ccc' }}
        scratch={{ radius: 20, percent: 0.5 }}
        onSuccess={handleSuccess}
      />
      
      <button onClick={reset}>重置</button>
    </div>
  )
}

export default App
```

### 类组件示例

```jsx
import React, { Component } from 'react'
import { LuckyScratch } from '@lucky-scratch/react'

class App extends Component {
  scratchRef = React.createRef()

  handleSuccess = (progress) => {
    console.log('刮开进度:', progress)
    alert('恭喜中奖！')
  }

  reset = () => {
    this.scratchRef.current?.init()
  }

  render() {
    return (
      <div className="scratch-wrapper">
        <div className="prize-content">🎉 恭喜中奖！</div>
        <LuckyScratch
          ref={this.scratchRef}
          width="300px"
          height="200px"
          mask={{ type: 'color', color: '#ccc' }}
          scratch={{ radius: 20, percent: 0.5 }}
          onSuccess={this.handleSuccess}
        />
        <button onClick={this.reset}>重置</button>
      </div>
    )
  }
}

export default App
```

**样式：**
```css
.scratch-wrapper {
  position: relative;
  width: 300px;
  height: 200px;
}
.prize-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ff6b6b;
}
```

<br />

## API

### Props 属性

| 属性    | 类型   | 默认值  | 说明       |
| ------- | ------ | ------- | ---------- |
| width   | String | '300px' | 画布宽度   |
| height  | String | '150px' | 画布高度   |
| mask    | Object | -       | 遮罩层配置 |
| scratch | Object | -       | 刮奖配置   |

### mask 遮罩层配置

| 属性  | 类型   | 默认值  | 说明                         |
| ----- | ------ | ------- | ---------------------------- |
| type  | String | 'color' | 遮罩类型：'color' 或 'image' |
| color | String | '#ccc'  | type 为 'color' 时的颜色值   |
| src   | String | -       | type 为 'image' 时的图片地址 |

**示例：**
```jsx
// 颜色遮罩
mask={{ type: 'color', color: '#cccccc' }}

// 图片遮罩
mask={{ type: 'image', src: 'https://example.com/mask.png' }}
```

### scratch 刮奖配置

| 属性    | 类型   | 默认值 | 说明                         |
| ------- | ------ | ------ | ---------------------------- |
| radius  | Number | 20     | 刮开半径（像素）             |
| percent | Number | 0.5    | 触发成功的刮开比例，范围 0-1 |

**示例：**
```jsx
scratch={{ radius: 30, percent: 0.6 }}
```

### Events 事件

| 事件名            | 参数     | 说明                                            |
| ----------------- | -------- | ----------------------------------------------- |
| onOnceBeforeStart | resolve  | 首次刮奖前的校验，调用 resolve() 允许刮奖       |
| onBeforeStart     | resolve  | 每次刮动前的校验                                |
| onStart           | -        | 开始刮奖时触发                                  |
| onEnd             | -        | 停止刮奖时触发                                  |
| onSuccess         | progress | 刮开达到阈值时触发，progress 为当前刮开的百分比 |
| onAfterInit       | -        | 初始化完成时触发                                |

**事件示例：**
```jsx
<LuckyScratch
  onOnceBeforeStart={(resolve) => {
    // 权限验证
    if (isLogin) {
      resolve() // 允许刮奖
    } else {
      alert('请先登录')
    }
  }}
  onStart={() => {
    console.log('开始刮奖')
  }}
  onSuccess={(progress) => {
    console.log('刮开进度:', progress)
    alert('恭喜中奖！')
  }}
/>
```

### Methods 方法

| 方法名 | 参数 | 说明                 |
| ------ | ---- | -------------------- |
| init() | -    | 重置刮刮卡到初始状态 |

**调用示例：**
```jsx
const scratchRef = useRef(null)
scratchRef.current?.init()
```

<br />

## 完整示例

```jsx
import React, { useRef, useState } from 'react'
import { LuckyScratch } from '@lucky-scratch/react'

function App() {
  const scratchRef = useRef(null)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = (resolve) => {
    // 权限验证
    if (isLogin) {
      resolve()
    } else {
      alert('请先登录')
    }
  }

  const handleSuccess = (progress) => {
    console.log('刮开进度:', progress)
    // 调用后端接口获取奖品
    fetch('/api/get-prize')
      .then(res => res.json())
      .then(data => {
        alert(`恭喜获得：${data.prize}`)
      })
  }

  const reset = () => {
    scratchRef.current?.init()
  }

  return (
    <div className="scratch-wrapper">
      <div className="prize-content">🎉 iPhone 15 Pro Max</div>
      <LuckyScratch
        ref={scratchRef}
        width="300px"
        height="200px"
        mask={{ type: 'image', src: 'https://example.com/mask.png' }}
        scratch={{ radius: 30, percent: 0.6 }}
        onOnceBeforeStart={handleAuth}
        onSuccess={handleSuccess}
      />
      <button onClick={reset}>重置</button>
    </div>
  )
}

export default App
```

<br />

## 🙏🙏🙏 点个Star

**如果您觉得这个项目还不错, 可以在 [Github](https://github.com/Cosmiumx/lucky-scratch) 上面帮我点个`star`, 支持一下作者 ☜(ﾟヮﾟ☜)**

<br />
