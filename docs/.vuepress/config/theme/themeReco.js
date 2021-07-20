/*
 * @Description: 
 * @Author:  chessyu 
 * @Date: 2021-07-19 11:33:21
 */
module.exports = {
  type: 'blog',
  fullscreen: true,
  mode: 'auto',
  logo: '/logo.png',
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类' // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: '标签' // 默认 “标签”
    }
  },
  socialLinks: [     // 信息栏展示社交信息
    { icon: 'reco-github', link: 'https://github.com/recoluan' },
    { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
  ],
  markdown: {
    lineNumbers: true, //代码显示行号
  },
  // 最后更新时间
  lastUpdated: 'Last Updated', // string | boolean
  // 作者
  author: 'chessyu',
  // 备案号
  // record: '浙ICP备20018057号-2',
  // 项目开始时间
  startYear: '2021',
  search: true,
  searchMaxSuggestions: 10,
}