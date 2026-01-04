
<div align="center">
  <h1>微信小程序 刮刮卡组件</h1>
  <p>一个基于微信小程序的刮刮卡抽奖插件</p>
</div>

<br />

## 安装

### 方式 1：通过 npm 安装（推荐）

#### 1. 初始化 package.json

先找到小程序项目的根目录，看是否有 `package.json` 文件，如果没有再执行下面的命令来创建该文件：

```bash
npm init -y
```

#### 2. 安装 npm 包

```bash
npm install @lucky-scratch/mini@latest
```

#### 3. 构建 npm

在微信开发者工具中：

1. 找到左上角点击 **工具**
2. 点击 **构建 npm**
3. 弹窗提示 **构建成功** 即可！

#### 4. 引入自定义组件

可以在 `app.json` 全局引入，也可以在指定页面的 `.json` 文件里引入：

```json
{
  "usingComponents": {
    "lucky-scratch": "/miniprogram_npm/@lucky-scratch/mini/lucky-scratch-component/index"
  }
}
```

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

<br />

## 使用

### 在页面中使用组件

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
