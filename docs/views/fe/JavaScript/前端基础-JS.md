---
title: 前端基础知识整理 -- JS
sidebar: 'auto'
date: 2020-05-20
tags:
 - 面试
categories:
 - JavaScript
---
> 比较基础，没事时自己要多看 

<!-- more -->

## JS知识

### **JavaScript的组成**
- JavaScript 由以下三部分组成：
  - ECMAScript（核心）：JavaScript 语言基础
  - DOM（文档对象模型）：规定了访问HTML和XML的接口
  - BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法
### **JS的基本数据类型和引用数据类型**
- 基本数据类型：undefined、null、boolean、number、string、symbol
- 引用数据类型：object、array、function
### **如何编写高性能的JavaScript**
* 遵循严格模式："use strict";
* 将js脚本放在页面底部，加快渲染页面
* 将js脚本将脚本成组打包，减少请求
* 使用非阻塞方式下载js脚本
* 尽量使用局部变量来保存全局变量
* 尽量减少使用闭包
* 使用 window 对象属性方法时，省略 window
* 尽量减少对象成员嵌套
* 缓存 DOM 节点的访问
* 通过避免使用 eval() 和 Function() 构造器
* 给 setTimeout() 和 setInterval() 传递函数而不是字符串作为参数
* 尽量使用直接量创建对象和数组
* 最小化重绘(repaint)和回流(reflow)
### **描述浏览器的渲染过程，DOM树和渲染树的区别**
- 浏览器的渲染过程：
  - 解析HTML构建 DOM(DOM树)，并行请求 css/image/js
  - CSS 文件下载完成，开始构建 CSSOM(CSS树)
  - CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
  - 布局(Layout)：计算出每个节点在屏幕中的位置
  - 显示(Painting)：通过显卡把页面画到屏幕上
  
- DOM树 和 渲染树 的区别：
  - DOM树与HTML标签一一对应，包括head和隐藏元素
  - 渲染树不包括head和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的css属性
### **重绘和回流（重排）的区别和关系**
- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS获取Layout属性值（如：offsetLeft、scrollTop、getComputedStyle等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流
### **如何最小化重绘(repaint)和回流(reflow)**
- 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
- 缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）
- 避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx
### **解释JavaScript中的作用域与变量声明提升**
- JavaScript作用域：
  - 在Java、C等语言中，作用域为for语句、if语句或{}内的一块区域，称为作用域；
  - 而在 JavaScript 中，作用域为function(){}内的区域，称为函数作用域。

- JavaScript变量声明提升：
  -  在JavaScript中，函数声明与变量声明经常被JavaScript引擎隐式地提升到当前作用域的顶部。
  -  声明语句中的赋值部分并不会被提升，只有名称被提升
  -  函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明
  -  如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数
### **介绍JavaScript的原型，原型链，有什么特点**
- 原型：
  - JavaScript的所有对象中都包含了一个 [__proto__] 内部属性，这个属性所对应的就是该对象的原型
  - JavaScript的函数对象，除了原型 [__proto__] 之外，还预置了 prototype 属性
  - 当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 [__proto__]。

- 原型链：
  -  当一个对象调用的属性/方法自身不存在时，就会去自己 [__proto__] 关联的前辈 prototype 对象上去找
  -  如果没找到，就会去该 prototype 原型 [__proto__] 关联的前辈 prototype 去找。依次类推，直到找到属性/方法或 undefined 为止。从而形成了所谓的“原型链”
  

- 原型特点：
  - JavaScript对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变

### **Javascript如何实现继承**
- 构造函数绑定：使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上


```javascript   　
function Cat(name,color){
 　Animal.apply(this, arguments);
 　this.name = name;
 　this.color = color;
}
```
- 实例继承：将子对象的 prototype 指向父对象的一个实例     
 
```javascript
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

- 拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象
 
```javascript         　　
    function extend(Child, Parent) {
  　　　var p = Parent.prototype;
  　　　var c = Child.prototype;
  　　　for (var i in p) {
  　　　   c[i] = p[i];
  　　　}
  　　　c.uber = p;
  　 }
  ```
- 原型继承：将子对象的 prototype 指向父对象的 prototype      

```javascript
    function extend(Child, Parent) {
        var F = function(){};
      　F.prototype = Parent.prototype;
      　Child.prototype = new F();
      　Child.prototype.constructor = Child;
      　Child.uber = Parent.prototype;
    }
  ```
- ES6 语法糖 extends：class ColorPoint extends Point {}

```javascript
    class ColorPoint extends Point {
       constructor(x, y, color) {
          super(x, y); // 调用父类的constructor(x, y)
          this.color = color;
       }
       toString() {
          return this.color + ' ' + super.toString(); // 调用父类的toString()
       }
    }
```
### **Javascript作用链域**
- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 如果当前作用域没有找到属性或方法，会向上层作用域查找，直至全局函数，这种形式就是作用域链
### **谈谈this对象的理解**
- this 总是指向函数的直接调用者
- 如果有 new 关键字，this 指向 new 出来的实例对象
- 在事件中，this指向触发这个事件的对象
- IE下 attachEvent 中的this总是指向全局对象Window
### **什么是 Window 对象，什么是 Document 对象**
- Window 对象表示当前浏览器的窗口，是JavaScript的顶级对象。
- 我们创建的所有对象、函数、变量都是 Window 对象的成员。
- Window 对象的方法和属性是在全局范围内有效的。
- Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）
-  Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问
-  Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问
### **事件的三个阶段**
- 捕获、目标、冒泡
### **在一个DOM上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获**
* 该DOM上的事件如果被触发，会执行两次（执行次数等于绑定次数）
* 如果该DOM是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获
* 如果该DOM是处于事件流中的非目标元素，则先执行捕获，后执行冒泡
### **什么是函数节流，介绍一下应用场景和原理**
* 函数节流(throttle)是指阻止一个函数在很短时间间隔内连续调用。
只有当上一次函数执行后达到规定的时间间隔，才能进行下一次调用。
但要保证一个累计最小调用间隔（否则拖拽类的节流都将无连续效果）

* 函数节流用于 onresize, onscroll 等短时间内会多次触发的事件

* 函数节流的原理：使用定时器做时间节流。
当触发一个事件时，先用 setTimout 让这个事件延迟一小段时间再执行。
如果在这个时间间隔内又触发了事件，就 clearTimeout 原来的定时器，
再 setTimeout 一个新的定时器重复以上流程。

* 函数节流简单实现：

```javascript
function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }， 100); // 两次调用至少间隔 100ms
}
// 调用
window.onresize = function(){
    throttle(myFunc, window);
}
```
### **null，undefined 的区别**
- undefined   表示不存在这个值。
- undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined
- 例如变量被声明了，但没有赋值时，就等于undefined

- null 表示一个对象被定义了，值为“空值”
- null : 是一个对象(空对象, 没有任何属性和方法)
- 例如作为函数的参数，表示该函数的参数不是对象；

-  在验证null时，一定要使用　=== ，因为 == 无法分别 null 和　undefined
### **DOM操作——怎样添加、移除、移动、复制、创建和查找节点**
- （1）创建新节点
  - createDocumentFragment() //创建一个DOM片段
  - createElement()   //创建一个具体的元素
  - createTextNode()   //创建一个文本节点
- （2）添加、移除、替换、插入
  - appendChild()
  - removeChild()
  - replaceChild()
  - insertBefore() //在已有的子节点前插入一个新的子节点
- （3）查找
  - getElementsByTagName()    //通过标签名称
  - getElementsByName()    // 通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
  - getElementById()    //通过元素Id，唯一性

### **渐进增强和优雅降级**
- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容
### **JavaScript 的同源策略和作用**
- 同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议
- 作用：比如一个黑客程序，他利用Iframe把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过Javascript读取到你的表单中input中的内容，这样用户名，密码就轻松到手了。