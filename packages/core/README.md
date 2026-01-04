

<div align="center">
  <img src="https://unpkg.com/buuing@0.0.1/imgs/lucky-canvas.png" width="128" alt="logo" />
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

<br />

## 安装

### 通过 npm/yarn

```bash
npm install lucky-scratch
# 或
yarn add lucky-scratch
```

### 通过 CDN

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/lucky-scratch@latest/dist/index.umd.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/lucky-scratch@latest/dist/index.umd.js"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/lucky-scratch@1.1.2/dist/index.umd.js"></script>
```

<br />

## 快速开始

### 使用 ES Module

```javascript
import { LuckyScratch } from 'lucky-scratch'

const scratch = new LuckyScratch({
  el: '#scratch',
}, {
  width: '300px',
  height: '200px',
  mask: { type: 'color', color: '#ccc' },
  scratch: { radius: 20, percent: 0.5 },
  success: (progress) => {
    alert('恭喜中奖！')
  }
})

// 重置
scratch.init()
```

### 使用 CDN

```html
<!DOCTYPE html>
<html>
<head>
  <title>刮刮卡示例</title>
</head>
<body>
  <div id="scratch" style="position: relative; width: 300px; height: 200px;">
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 24px;">
      🎉 恭喜中奖！
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/lucky-scratch@latest/dist/index.umd.js"></script>
  <script>
    const scratch = new LuckyScratch({ el: '#scratch' }, {
      width: '300px',
      height: '200px',
      mask: { type: 'color', color: '#ccc' },
      scratch: { radius: 20, percent: 0.5 },
      success: () => alert('恭喜中奖！')
    })
  </script>
</body>
</html>
```

<br />

## API

### 构造函数

```javascript
new LuckyScratch(container, config)
```

**container** - 容器配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| el | string \| HTMLElement | 必填 | 容器选择器或 DOM 元素 |

**config** - 刮刮卡配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | string | '300px' | 画布宽度 |
| height | string | '150px' | 画布高度 |
| mask | object | - | 遮罩层配置，见下方说明 |
| scratch | object | - | 刮奖配置，见下方说明 |
| onceBeforeStart | function | - | 首次刮奖前的校验回调 |
| beforeStart | function | - | 每次刮动前的校验回调 |
| start | function | - | 开始刮奖回调 |
| end | function | - | 停止刮奖回调 |
| success | function | - | 刮开达到阈值回调 |
| afterInit | function | - | 初始化完成回调 |

### mask 遮罩层配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | 'color' | 遮罩类型：'color' 或 'image' |
| color | string | '#ccc' | type 为 'color' 时的颜色值 |
| src | string | - | type 为 'image' 时的图片地址 |

**示例：**
```javascript
// 颜色遮罩
mask: { type: 'color', color: '#cccccc' }

// 图片遮罩
mask: { type: 'image', src: 'https://example.com/mask.png' }
```

### scratch 刮奖配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| radius | number | 20 | 刮开半径（像素） |
| percent | number | 0.5 | 触发成功的刮开比例，范围 0-1 |

**示例：**
```javascript
scratch: {
  radius: 30,      // 刮开半径 30px
  percent: 0.6     // 刮开 60% 时触发 success 事件
}
```

### 事件回调

**onceBeforeStart(resolve)**
- 首次刮奖前的校验，只触发一次
- 调用 `resolve()` 允许刮奖，可用于权限验证

```javascript
onceBeforeStart: (resolve) => {
  if (isLogin) {
    resolve()  // 允许刮奖
  } else {
    alert('请先登录')
  }
}
```

**beforeStart(resolve)**
- 每次刮动前的校验
- 调用 `resolve()` 允许刮奖

**start()**
- 开始刮奖时触发

**end()**
- 停止刮奖时触发（手指/鼠标离开）

**success(progress)**
- 刮开达到设定百分比时触发
- `progress`: 当前刮开的百分比（0-1）

```javascript
success: (progress) => {
  console.log('刮开进度:', progress)  // 0.6
  alert('恭喜中奖！')
}
```

**afterInit()**
- 初始化完成时触发

### 实例方法

**init()**
- 重置刮刮卡到初始状态
- 无参数，无返回值

```javascript
const scratch = new LuckyScratch({ el: '#scratch' }, config)

// 重置刮刮卡
scratch.init()
```

<br />

## 完整示例

```javascript
import { LuckyScratch } from 'lucky-scratch'

const scratch = new LuckyScratch({ el: '#scratch' }, {
  width: '300px',
  height: '200px',
  mask: { type: 'image', src: 'https://example.com/mask.png' },
  scratch: { radius: 30, percent: 0.6 },
  onceBeforeStart: (resolve) => {
    // 权限验证
    fetch('/api/check-auth').then(res => res.json()).then(data => {
      data.isLogin ? resolve() : alert('请先登录')
    })
  },
  success: (progress) => {
    // 获取奖品
    fetch('/api/get-prize').then(res => res.json()).then(data => {
      alert(`恭喜获得：${data.prize}`)
    })
  }
})

// 重置
document.querySelector('#resetBtn').onclick = () => scratch.init()
```
<br />

## 🙏🙏🙏 点个Star

**如果您觉得这个项目还不错, 可以在 [Github](https://github.com/Cosmiumx/lucky-scratch) 上面帮我点个`star`, 支持一下作者 ☜(ﾟヮﾟ☜)**
