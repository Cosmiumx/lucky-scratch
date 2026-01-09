
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
    <a href="https://www.jsdelivr.com/package/npm/lucky-scratch" target="_black">
      <img src="https://data.jsdelivr.com/v1/package/npm/lucky-scratch/badge" alt="downloads" />
    </a>
  </p>
</div>

<div align="center">
  <img src="https://unpkg.com/cosmium@0.0.1/images/other/lucky-scratch.gif" alt="lucky-scratch demo" />
</div>

<div align="center">

|   适配框架   |                           npm包                            |                                                         最新版本                                                         |                                                                                                  npm下载量                                                                                                   |
| :----------: | :--------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `JS` / `JQ`  |      [lucky-scratch](https://100px.net/usage/js.html)      |    <img src="https://img.shields.io/npm/v/lucky-scratch?color=%23ffba15&logo=npm&style=flat-square" alt="version" />     |        <a href="https://www.npmjs.com/package/lucky-scratch" target="_black"><img src="https://img.shields.io/npm/dm/lucky-scratch?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>        |
|    `Vue`     |   [@lucky-scratch/vue](https://100px.net/usage/vue.html)   |  <img src="https://img.shields.io/npm/v/@lucky-scratch/vue?color=%23ffba15&logo=npm&style=flat-square" alt="version" />  |   <a href="https://www.npmjs.com/package/@lucky-scratch/vue" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-scratch/vue?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>   |
|   `React`    | [@lucky-scratch/react](https://100px.net/usage/react.html) | <img src="https://img.shields.io/npm/v/@lucky-scratch/react?color=%23ffba15&logo=npm&style=flat-square" alt="version" /> | <a href="https://www.npmjs.com/package/@lucky-scratch/react" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-scratch/react?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a> |
| `微信小程序` |   [@lucky-scratch/mini](https://100px.net/usage/wx.html)   | <img src="https://img.shields.io/npm/v/@lucky-scratch/mini?color=%23ffba15&logo=npm&style=flat-square" alt="version" />  |  <a href="https://www.npmjs.com/package/@lucky-scratch/mini" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-scratch/mini?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>  |

</div>

<br />

## 功能特性

- 🎨 支持自定义遮罩层（颜色/图片）
- 🖱️ 支持触摸和鼠标刮奖
- 📱 跨平台支持（Web、小程序）
- 🎯 可配置刮开比例触发中奖
- 🔧 灵活的事件回调系统
- 💪 TypeScript 支持

<br />

## 快速开始

### 安装

```bash
# 原生 JS / jQuery
npm install lucky-scratch

# Vue 2/3
npm install @lucky-scratch/vue

# React
npm install @lucky-scratch/react

# 微信小程序
npm install @lucky-scratch/mini
```

### 基础用法

```javascript
import { LuckyScratch } from 'lucky-scratch'

const scratch = new LuckyScratch({
  el: '#scratch',
}, {
  width: '300px',
  height: '150px',
  mask: {
    type: 'color',
    color: '#ccc'
  },
  scratch: {
    radius: 20,
    percent: 0.5
  },
  success: (progress) => {
    console.log('刮开进度:', progress)
    alert('恭喜中奖！')
  }
})
```

<br />

## 配置选项

### mask 遮罩层配置

```javascript
{
  type: 'color',  // 'color' | 'image'
  color: '#ccc',  // 当 type 为 'color' 时的颜色
  src: ''         // 当 type 为 'image' 时的图片地址
}
```

### scratch 刮奖配置

```javascript
{
  radius: 20,     // 刮开半径
  percent: 0.5    // 触发成功的刮开比例 (0-1)
}
```

### 事件回调

- `onceBeforeStart`: 首次刮奖前的校验（只触发一次）
- `beforeStart`: 每次刮动前的校验
- `start`: 开始刮奖
- `end`: 停止刮奖
- `success`: 刮开达到阈值时触发
- `afterInit`: 初始化完成

<br />

## 贡献者

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/Cosmiumx" target="_blank"><img width="50px" src="https://avatars.githubusercontent.com/u/40048575?v=4"></a><div><span title="核心开发">🤖</span> <span title="基础建设">🛰</span> <span title="维护文档">📚</span></div></td>
  </tr>
</table>

<br />

## 🙏🙏🙏 点个Star

**如果您觉得这个项目还不错, 可以在 [Github](https://github.com/Cosmiumx/lucky-scratch) 上面帮我点个`star`, 支持一下作者 ☜(ﾟヮﾟ☜)**

<br />

## 问题反馈

- Bug 反馈请直接去 Github 上面提 Issues

<br />

## License

Apache-2.0

<!-- lerna过滤器配置 -->
<!-- https://github.com/lerna/lerna/tree/main/core/filter-options#readme -->
