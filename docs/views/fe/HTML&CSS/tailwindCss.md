---
title: tailwind Css
sidebar: 'auto'
date: 2021-07-02
tags:
 - Css
categories:
 - HTML/CSS
---

> 新技术，要保存关注，万一哪天能用上呢

## tailwind css 官方解释
原文：A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.

译文：Tailwind CSS 是一个功能类优先的 CSS 框架，它集成了诸如 `flex`, `pt-4`, `text-center` 和 `rotate-90` 这样的的类（原子样式），它们能直接在脚本标记语言中组合起来，构建出任何设计。

## 基本概念
 - 基于约束：统一全局元素的一致性，包括颜色选择，边框，阴影，间距，排版等等。
 - 性能：tailwind 在构建生产环境时会 treeshking 删除未用到的样式，最终的文件大小可能只有 10 KB。
 - 移动优先：tailwind 实现媒体查询只需要在 HTML 中构建响应式设计，在功能类前面加上断点 ` md: ` 等标记即可实现。
 - 状态变体：支持 hover, focus,action, disabled, focus-within, focus-visible等，在类前面加入 ` hover: ` 即可。
 - 深色模式：支持深色模式，只需将深色模式 ` dark: ` 后填入想要的颜色类名。深色模式适用于背景色，文本颜色，边框颜色，甚至渐变色，深色模式开箱即用，无需配置。
 - 定制化：使用tailwind.config.js 文件构建自己的设计系统，然后让 tailwind 将其转换成自己的定制 CSS 框架。

## 基本使用规则
 #### 元素样式重置
    使用 tailwind css 时内部已抹平所有浏览器的默认样式，使得所有样式统一。
    - h1 - h6 字体大小一致，移除加粗样式
    - ol ul 列表无样式。
    - 图片是设置成块级元素。
    - 所有边框样式重置。
    - 按钮默认有轮廓。
   [详情：官方地址](https://www.tailwindcss.cn/docs/preflight)


 #### 摸索规律
    - 功模块下对应着多种系列名。职责单一，多种系列组合就可渲染出我们想要的布局样式，具体系列还得参考官网。
    - 基础定制、配置、主题、断点、颜色、间距、变体、插件、预设 等强大功能。
    - 前段时间安装用时没会报 postcss 版本问题。解决后，重新档代码后依然会报错。
    - 后面的项目必定会用上此框架。
    

  

