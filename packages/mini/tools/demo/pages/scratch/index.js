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
  onLoad() {
    console.log('刮刮卡页面加载')
  },
  onScratchStart() {
    console.log('开始刮奖')
  },
  onScratchEnd() {
    console.log('停止刮奖')
  },
  onScratchSuccess(e) {
    const progress = e.detail
    console.log('刮奖完成，当前进度:', progress)
    wx.showModal({
      title: '恭喜中奖',
      content: '🎉 恭喜中奖 iPhone 15 Pro Max！',
      showCancel: false
    })
  },
  resetScratch() {
    const child = this.selectComponent('#lucky-scratch')
    console.log('resetScratch :', child)
    if (child) {
      child.init()
    }
  }
})

