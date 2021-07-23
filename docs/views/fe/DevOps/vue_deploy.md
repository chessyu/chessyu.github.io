---
title: VuePress + Travis CI + Github Pages搭建个人博客
date: 2020-04-24
tags:
 - 工具
categories:
 - DevOps
sidebar: false
---

::: tip
* vuepress 简洁易用
* Github Pages配合github好管理
* travis-ci足够自动化
:::


# 站在巨人的肩膀上
## 提供三个优秀的参考链接，第三个是自定义域名，根据自己需求选看，最后给一波总结，我踩的坑及解决方案

- 从零搭建 `vuepress` 项目及使用 `vuepress-theme-reco` 主题，参考[VuePress博客美化之reco主题](https://www.cnblogs.com/glassysky/p/13387739.html)

- 将项目代码提交到 github 仓库后，配置 `travis CI`步骤，参考[拯救懒癌文档君 - VuePress + Travis CI + Github Pages 自动线上生成文档](https://juejin.im/post/5d0715f6f265da1ba56b1e01)

- 自定义 github pages 域名的文章 参考[GitHub Pages自定义域名](https://juejin.im/post/6844903558106578957)，根据自己的需求选择。

前两个链接大致看了一遍后，再动手来创建项目与集成 travis CI .

## 踩中的坑
- 仓库名写错，请严格按照 `[githubname].github.io` 来创建仓库， githubname 就是你的 github 名称 如图

![](https://chessyu.github.io/help-B.png)

- 在 travis CI 中修改项目配置项时，需要添加自定义的变量名时，需要与项目根目录下的 `travis.yml` 里的变量名称一致，最好对照着检查下名称时否一致。以免编译通过后，访问 github pages 时显示 404。

![](https://chessyu.github.io/travis-ci.png)

我当时配置时就踩过这两个坑，现在给出提示，按照步骤来一般是没有问题的。开启 github pages 后就已经完成所有配置，到此，只要push一次代码，就会触发travis-ci自动build，推送到指定分支(main)，然后你在https://chessyu.github.io就可以访问到了。最后注意一点 github 仓库下有两个分支，docs(源代码分支，设置成默认分支，用来提交源代码)，main(项目编译后的文件存放的分支，也就是 travis CI 提交代码的分支)。


## 热部署Hot Reload
没错，vuepress 1.x这个功能是有问题的，在这个[#issue](https://github.com/vuejs/vuepress/issues/1283)里有讲，至今未见关闭。
解决办法也有多人提出多种方案，我采用[pepsifan](https://github.com/pepsifan)提出的nodemon解决方案，亲测有效。
下面是[pepsifan](https://github.com/pepsifan)的方案：
1. 安装nodemon
``` sh
npm i -D nodemon
```
2. 修改package.json，增加命令
``` javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "start": "nodemon --ext md,vue --watch .vuepress --watch . --exec vuepress dev docs" # 新增的启动命令
  },
```
3. start启动
``` sh
yarn start
```
这个方案监控了.vue和.md文件的变动，会触发vuepress工程reload，浏览器刷新可见新内容。

## 参考文章
- [VuePress博客美化之reco主题](https://www.cnblogs.com/glassysky/p/13387739.html)
- [拯救懒癌文档君 - VuePress + Travis CI + Github Pages 自动线上生成文档](https://juejin.im/post/6844903869558816781)
- [GitHub Pages自定义域名](https://juejin.im/post/6844903558106578957)
