module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
  { text: '项目经验', 
    icon: 'reco-api',
    items: [
      { text: '微前端-管理平台', link: 'http://120.79.143.23:2001', icon: 'reco-api' },
      { text: 'UI-组件', link: 'https://www.npmjs.com/package/public-component-ui/', icon: 'reco-npm' },
    ]
  },
  { text: '关于我', 
    icon: 'reco-message',
    items: [
      { text: '关于我', link: '/views/about/', icon: 'reco-account' },
      { text: 'GitHub', link: 'https://github.com/chessyu', icon: 'reco-github' },
    ]
  }
]