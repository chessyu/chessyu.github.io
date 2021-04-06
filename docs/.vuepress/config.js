const themeConfig = require('./config/theme/')

module.exports = {
  base: '/',
  title: "默默无闻的前端选手",
  description: '学习、归纳、总结、实践',
  dest: 'docs/.vuepress/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  codeTheme: 'solarizedlight',    
    /**
     * support for
     * 'default'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     */
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/medium-zoom',
    'flowchart',
    '@vuepress-reco/vuepress-plugin-loading-page',
    // 看板娘
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["blackCat"],
        clean: true,
        height:260,
        modelStyle: {
          position: "fixed",
          right: "0px",
          bottom: "0px",
          opacity: "0.9",
          zIndex: 99999,
          objectFit: 'cover',
        }
      }
    ],
    // 鼠标点击特效
    [
      "cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: ['circle'],  // shape of the particle, default: 'star'， 可选'circle'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    
    // // 动态标题
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)老板好！",
        hideIcon: "/favicon.ico",
        hideText: "(●—●)快快回来！",
        recoverTime: 2000
      }
    ],
    // ['@vuepress-reco/comments', {
    //   solution: 'valine',
    //   options: {
    //     appId: 'vcfdlxv9vEKeHDQT1bEaLVaG-gzGzoHsz',// your appId
    //     appKey: 'E0Ae8xnQUmiCUesRH42CA48H', // your appKey
    //   }
    // }],
    ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
      width: '300px', // 默认 260px
      title: '微信号:chessyu_',
      body: [
        {
          type: 'text',
          content: `随手笔记，欢迎指点 🎉🎉🎉`,
          style: 'text-aligin: center;'
        },
        // {
        //   type: 'image',
        //   src: '/wechat.jpeg'
        // }
      ],
      // footer: [
      //   {
      //     type: 'button',
      //     text: '微信',
      //     link: '/wechat.jpeg'
      //   },
      //   {
      //     type: 'button',
      //     text: '支付宝',
      //     link: '/alipay.jpeg'
      //   }
      // ]
    }],
    [
      'meting',
      {
        meting: {
          // server: "netease",
          // type: "playlist",
          // mid: "6689304703",
          auto: 'https://music.163.com/#/playlist?id=6689304703'
        },
        aplayer:{
          fixed: false ,   //默认是 false  是否开启吸底模式
          mini:true,        //默认是 false  是否开启迷你模式
          autoplay:false, //默认是 false 否开启自动播放
          lrcType: 0,       //更多属性 访问 https://github.com/moefyit/vuepress-plugin-meting
        },
        mobile:{
          lrc:false
        },
      },
    ]
  ] 
}  