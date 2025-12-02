
<div align="center">
  <h1>微信小程序 刮刮卡组件</h1>
  <p>一个基于微信小程序的刮刮卡抽奖插件</p>
</div>

<br />

## 安装 - Installation

```bash
npm install @lucky-scratch/mini
```

<br />

## 使用 - Usage

### 1. 在 app.json 中配置组件

```json
{
  "usingComponents": {
    "lucky-scratch": "./components/lucky-scratch/index"
  }
}
```

### 2. 在页面中使用

```xml
<lucky-scratch
  id="lucky-scratch"
  width="600rpx"
  height="400rpx"
  mask="{{mask}}"
  scratch="{{scratch}}"
  bindstart="onScratchStart"
  bindend="onScratchEnd"
  bindsuccess="onScratchSuccess"
/>
```

### 3. 配置参数

```javascript
Page({
  data: {
    mask: {
      type: 'color',
      color: '#ccc'
    },
    scratch: {
      radius: 20,
      percent: 0.5
    }
  },
  onScratchStart() {
    console.log('开始刮奖')
  },
  onScratchEnd() {
    console.log('停止刮奖')
  },
  onScratchSuccess(e) {
    console.log('刮奖完成，进度:', e.detail)
  }
})
```

<br />

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | String | '600rpx' | 画布宽度 |
| height | String | '400rpx' | 画布高度 |
| mask | Object | - | 遮罩层配置 |
| scratch | Object | - | 刮奖配置 |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| bindstart | 开始刮奖时触发 | - |
| bindend | 停止刮奖时触发 | - |
| bindsuccess | 刮奖完成时触发 | progress (刮开的进度) |

### 方法

| 方法名 | 说明 |
|--------|------|
| init() | 重置刮刮卡 |

<br />

## License

Apache-2.0

<br />
