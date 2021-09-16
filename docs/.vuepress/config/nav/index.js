
module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
  { text: '项目经验', 
    icon: 'reco-api',
    items: [
      { text: '数据大屏', link: 'https://chessyu.github.io/big-screen/', icon:'reco-api'},
      { text: 'UI-组件', link: 'https://www.npmjs.com/package/public-components-ui/', icon: 'reco-npm' },
      { text: 'Node Cli', link: 'https://www.npmjs.com/package/public-tools-cli', icon: 'reco-npm' },

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