---
title: 前端基础知识整理 -- CSS
sidebar: 'auto'
date: 2020-05-19
tags:
 - 面试
categories:
 - 前端
---
> 比较基础，没事时自己要多看 

<!-- more -->

## CSS知识

### **什么是BFC**
- BFC 是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 容器的方式有：
 - float 浮动
 - 绝对定位
 - overflow 不为 visiable
 - display 为表格布局或弹性布局

- BFC 主要的作用是：
 - 清除浮动
 - 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
### **display: none; 与 visibility: hidden; 的区别**
- 联系：它们都能让元素不可见
- 区别：
  - `display:none`;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility: hidden`;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
  - `display: none`;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；`visibility:hidden`;是继承属性，子孙节点消失由于继承了`hidden`，通过设置`visibility: visible`;可以让子孙节点显式
  - 修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘
  - 读屏器不会读取`display: none;`元素内容；会读取`visibility: hidden`元素内容

### **CSS有哪些继承属性**
- 关于文字排版的属性如：
  - `font`
	- `word-break`
	- `letter-spacing`
	- `text-align`
	- `text-rendering`
	- `word-spacing`
	- `white-space`
	- `text-indent`
	- `text-transform`
	- `text-shadow`
  - `line-height`
  - `color`
  - `visibility`
  - `cursor`
- 不可继承的属性：`border padding margin width height `
### **外边距重叠**
* 相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。
这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距
* 折叠结果遵循下列计算规则：
    - 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
    - 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值
    - 两个外边距一正一负时，折叠结果是两者的相加的和
### **标准盒模型和怪异盒模型**
- 盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
- 怪异盒模型（IE）的content部分把 border 和 padding计算了进去
### **CSS优先级**
- 相同权重，定义最近者为准：行内样式 > 内部样式 > 外部样式
- 含外部载入样式时，后载入样式覆盖其前面的载入的样式和内部样式
- 选择器优先级: 行内样式[1000] > id[100] > class[10] > Tag[1]
- 在同一组属性设置中，!important 优先级最高，高于行内样式
### **CSS3新增伪类**
```
p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。

:after          在元素之前添加内容,也可以用来做清除浮动。
:before         在元素之后添加内容
:enabled        
:disabled       控制表单控件的禁用状态。
:checked        单选框或复选框被选中
```
### **如何居中div**
- 给`div`设置一个宽度，然后添加`margin:0 auto`属性
```
div{
    width:200px;
    margin:0 auto;
 }
```
- 浮动元素居中

```
//确定容器的宽高 宽500 高 300 的层
//设置层的外边距
 .div {
      width:500px ; 
      height:300px;
      margin: -150px 0 0 -250px;
      position:relative;         //相对定位
      left:50%;
      top:50%;
 }
 ```
 - 绝对定位的div居中
 ```
  position: absolute;
  width: 1200px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
```
### **display**
- block         像块类型元素一样显示。
- none          元素消失，不在文档流中
- inline-block  像行内元素一样显示。
- list-item     象块类型元素一样显示，并添加样式列表标记。
- table         此元素会作为块级表格来显示
- inherit       规定应该从父元素继承 display 属性的值
- flex          flex布局
- table-cell    类似表格的自适应布局
### **position的值relative和absolute定位原点**
- absolute
    - 生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
- fixed （老IE不支持）
    - 生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative
    - 生成相对定位的元素，相对于其正常位置进行定位。
- static
    - 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。
- inherit
    - 规定从父元素继承 position 属性的值
###  **CSS3的新特性**
- 新增选择器     p:nth-child(n){color: rgba(255, 0, 0, 0.75)}
- 弹性盒模型     display: flex;
- 多列布局       column-count: 5;
- 媒体查询       @media (max-width: 480px) {.box: {column-count: 1;}}
- 个性化字体     @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}
- 颜色透明度     color: rgba(255, 0, 0, 0.75);
- 圆角           border-radius: 5px;
- 渐变           background:linear-gradient(red, green, blue);
- 阴影           box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
- 倒影           box-reflect: below 2px;
- 文字装饰       text-stroke-color: red;
- 文字溢出       text-overflow:ellipsis;
- 背景效果       background-size: 100px 100px;
- 边框效果       border-image:url(bt_blue.png) 0 10;
- 转换
  - 旋转          transform: rotate(20deg);
  - 倾斜          transform: skew(150deg, -10deg);
  - 位移          transform: translate(20px, 20px);
  - 缩放          transform: scale(.5);
- 平滑过渡       transition: all .3s ease-in .1s;
- 动画           @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;
 ### **用纯CSS创建一个三角形**
 ```
// 把上、左、右三条边隐藏掉（颜色设为 transparent）
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```
### **一个满屏 品 字布局 如何设计**
- 简单的方式：
    - 上面的div宽100%，
    - 下面的两个div分别宽50%，
    - 然后用float或者inline使其不换行即可
### **为什么要初始化CSS样式**
- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异
### **display:inline-block产生间隙**
- 原因：换行或空格会占据一定的位置
- 解决方法：
  - 除去当前元素的空格或换行
  - 当前元素的父元素中设置font-size:0;
  - 在当前元素的父元素中设置letter-spaceing:-4px;
### **隐藏元素的方法**
* visibility: hidden;   这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
* opacity: 0;           CSS3属性，设置0可以使一个元素完全透明
* position: absolute;   设置一个很大的 left 负值定位，使元素定位在可见区域之外
* display: none;        元素会变得不可见，并且不会再占用文档的空间。
* transform: scale(0);  将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
* `<div hidden="hidden">` HTML5属性,效果和display:none;相同，但这个属性用于记录一个元素的状态
* height: 0;            将元素高度设为 0 ，并消除边框
* filter: blur(0);      CSS3属性，将一个元素的模糊度设置为0，从而使这个元素“消失”在页面中
### **rgba() 和 opacity 的透明效果有什么不同**
* opacity 作用于元素以及元素内的所有内容（包括文字）的透明度
* rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果
### **css 属性 content 的作用**
- content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式
### **li与li之间有看不见的空白间隔**
* li排列受到中间空白(回车/空格)等的影响，因为空白也属于字符，会被应用样式占据空间，产生间隔
* 解决办法：在ul设置设置font-size=0,在li上设置需要的文字大小
### **圣杯布局**
* 要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽
  * 好处：重要的内容放在文档流前面可以优先渲染
  * 原理：利用相对定位、浮动、负边距布局，而不添加额外标签
```css
  .container {
      padding-left: 150px;
      padding-right: 190px;
  }
  .main {
      float: left;
      width: 100%;
  }
  .left {
      float: left;
      width: 190px;
      margin-left: -100%;
      position: relative;
      left: -150px;
  }
  .right {
      float: left;
      width: 190px;
      margin-left: -190px;
      position: relative;
      right: -190px;
  }
```
### **双飞翼布局**
- 双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局
- 原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。

 
```css
.container {
    /*padding-left:150px;*/
    /*padding-right:190px;*/
}
.main-wrap {
    width: 100%;
    float: left;
}
.main {
    margin-left: 150px;
    margin-right: 190px;
}
.left {
    float: left;
    width: 150px;
    margin-left: -100%;
    /*position: relative;*/
    /*left:-150px;*/
}
.right {
    float: left;
    width: 190px;
    margin-left: -190px;
    /*position:relative;*/
    /*right:-190px;*/
}
```
### **在CSS样式中常使用 px、em 在表现上有什么区别**
* px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能
* em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级font-size
### **浮动元素**
* 工作原理：
  - 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
  - 浮动元素碰到包含它的边框或者其他浮动元素的边框停留
* 引起的问题：
  - 父元素的高度无法被撑开，影响与父元素同级的元素
  - 与浮动元素同级的非浮动元素会跟随其后
* 清除浮动的方式
  - 添加额外标签，例如 `<div style="clear:both"></div>`
  - 使用 br 标签和其自身的 clear 属性，例如 `<br clear="all" />`
  - 父元素设置 overflow：hidden; 在IE6中还需要触发 hasLayout，例如zoom：1;
  - 父元素也设置浮动
  - 使用 :after 伪元素
 ```
.clearfix:after{
    content: "\200B";
    display: table; 
    height: 0;
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }
  ```
### **CSS 预处理器**
* CSS 预处理器基本思想：为 CSS 增加了一些编程的特性（变量、逻辑判断、函数等）
* 开发者使用这种语言进行进行 Web 页面样式设计，再编译成正常的 CSS 文件使用
* 使用 CSS 预处理器，可以使 CSS 更加简洁、适应性更强、可读性更佳，无需考虑兼容性
* 最常用的 CSS 预处理器语言包括：Sass（SCSS）和 LESS
### **CSS优化、提高性能的方法**
* 多个css合并，尽量减少HTTP请求
* 将css文件放在页面最上面
* 移除空的css规则
* 避免使用CSS表达式
* 选择器优化嵌套，尽量避免层级过深
* 充分利用css继承属性，减少代码量
* 抽象提取公共样式，减少代码量
* 属性值为0时，不加单位
* 属性值为小于1的小数时，省略小数点前面的0
* css雪碧图
### **浏览器是怎样解析CSS选择器的**
- 浏览器解析 CSS 选择器的方式是从右到左
### **抽离样式模块**
- CSS可以拆分成2部分：公共CSS 和 业务CSS：
  - 网站的配色，字体，交互提取出为公共CSS。这部分CSS命名不应涉及具体的业务
  - 对于业务CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的CSS
### **响应式设计**
* 响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本
* 基本原理是利用CSS3媒体查询，为不同尺寸的设备适配不同样式
* 对于低版本的IE，可采用JS获取屏幕宽度，然后通过resize方法来实现兼容
```javascript
$(window).resize(function () {
  screenRespond();
});
screenRespond();
function screenRespond(){
var screenWidth = $(window).width();
if(screenWidth <= 1800){
  $("body").attr("class", "w1800");
}
if(screenWidth <= 1400){
  $("body").attr("class", "w1400");
}
if(screenWidth > 1800){
  $("body").attr("class", "");
}
}
```
### **伪元素和伪类**
- 伪元素
  - 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。
  - 伪元素用 :: 表示,由于低版本IE对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素
- 伪类
  - 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素
  - 在 CSS 中伪类一直用 : 表示
 ```
a:hover {color: #FF00FF}
p:first-child {color: red}
```
### **如何修改Chrome记住密码后自动填充表单的黄色背景**
- 产生原因：由于Chrome默认会给自动填充的input表单加上 input:-webkit-autofill 私有属性造成的
- 解决方案1：在form标签上直接关闭了表单的自动填充：autocomplete="off"
- 解决方案2：input:-webkit-autofill { background-color: transparent; }
### **line-height的理解**
* line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
* 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
* 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中
* 赋值方式
  * 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
  * 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
  * 百分比：将计算后的值传递给后代
### **怎么让Chrome支持小于12px 的文字**
```css
  .shrink{
    -webkit-transform:scale(0.8);
    -o-transform:scale(1);
    display:inline-block;
  }
```
### **让页面里的字体变清晰，变细用CSS怎么做**
```css
  -webkit-font-smoothing: antialiased;
```
### **动画的最小时间间隔是多久**
- 16.7ms 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔: 1s / 60 * 1000 ＝ 16.7ms

