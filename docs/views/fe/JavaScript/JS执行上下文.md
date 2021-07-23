---
title: JS 执行上下文
sidebar: 'auto'
date: 2020-05-04
tags:
 - 面试
categories:
 - JavaScript
---


## JavaScript 执行机制（ES6版）
### 变量提升
只有理解了 JavaScript 的执行上下文，你才能更好的理解 JavaScript 言语本身
```javascript
showName()     //函数被执行
function showName (){
	console.log('函数被执行')
}
console.log(showName)   //undefined
var showName = "王蛋蛋"
```
所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分升到代码开头的 “行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined；实际上变量和函数声明在代码里的**位置是不会改变**的，而且是在编译阶段被 JavaScript 引擎放入内存中。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613036417687-20019c4e-bbb8-4a53-9517-3590fe5eb104.png#height=159&id=ZnTaZ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=159&originWidth=814&originalType=binary&ratio=1&size=52977&status=done&style=none&width=814)
```javascript
alert(a)  
a();
var a = 3;
function a(){
	alert(10)
}
function a (){
	alert(20)             
}
alert(a)
a = 6
a();  //报错 只有函数才有 callable 。

```
函数定义有三种

- 声明式      function foo(){}
- 匿名函数  var foo = function(){}
- 通过new Function   var foo = new Function(a,b,'return a + b')

当变量名称与声明式函数名称一样时，声明式函数名称优先级高于变量名称。后面函数会覆盖前面函数。
### 调用栈
哪些情况下代码才算是 “一段”代码，才会在执行之前就进行编译并创建执行上下文。一般说来，有这么三种情况：

1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生命周期内，全局代码上下文只有一份。
1. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下(除闭包外)，函数执行结束之后，创建的函数执行上下文会被销毁。
1. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

调用栈就是用来管理函数调用关系的一种数据结构。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613039375165-06949438-408b-4084-9033-00a535d095b1.png#height=460&id=p9E7k&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=823&originalType=binary&ratio=1&size=91281&status=done&style=none&width=823)
执行上下文内有四大块 变量环境、词法环境、outer、this
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613039498836-c5141093-c2cd-4f3d-b1df-bbc4edb04c09.png#height=429&id=bH8Df&margin=%5Bobject%20Object%5D&name=image.png&originHeight=429&originWidth=836&originalType=binary&ratio=1&size=189161&status=done&style=none&width=836)
```javascript
var a =2 
function add(b,c){
	return b + c;
}
function addAll(b,c){
	var d = 10
  var result = add(b,c)
  return a + result + d
}
addAll(3,6)
```
第一步，创建全局上下文，并将其压入栈底。将以 var 和 式声明函数 定义的变量存入 变量环境 add、addAll 引用的是堆里面引用地址(十六进制)编码
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613112239441-49af39c9-22c9-4ff5-b013-53e992592c42.png#height=532&id=N6Zx5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=532&originWidth=863&originalType=binary&ratio=1&size=138099&status=done&style=none&width=863)
第二步，执行阶段，将 2 的值赋给 a ,调用 addAll 函数,同时压入栈 addAll 函数执行上下文 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613112300051-4b40615c-76d3-420f-ae10-72d928f9b356.png#height=190&id=f8Oda&margin=%5Bobject%20Object%5D&name=image.png&originHeight=190&originWidth=830&originalType=binary&ratio=1&size=72115&status=done&style=none&width=830)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613112374152-f3c0e722-5544-41ea-9962-90fd723cb066.png#height=466&id=NkPYM&margin=%5Bobject%20Object%5D&name=image.png&originHeight=466&originWidth=855&originalType=binary&ratio=1&size=173101&status=done&style=none&width=855)
第三步，执行到 add 函数
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613113066204-a1cf1d9a-3726-4325-9fa9-79b3d1440f7e.png#height=525&id=gyywZ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=525&originWidth=857&originalType=binary&ratio=1&size=198917&status=done&style=none&width=857)
第四步，执行完 add 函数
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613113119034-54ca24ef-e99e-4e9d-9489-1b3614bd5830.png#height=514&id=KT8qo&margin=%5Bobject%20Object%5D&name=image.png&originHeight=514&originWidth=827&originalType=binary&ratio=1&size=170067&status=done&style=none&width=827)
第五步， 执行完 addAll 函数
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613113167326-8e4307f6-d196-4eff-9ce8-7d773c2be526.png#height=398&id=SJSCc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=398&originWidth=796&originalType=binary&ratio=1&size=123655&status=done&style=none&width=796)
### 块级作用域
正是由于 JavaScript 存在变量提升这种特性，从而导致了很多与直觉不符的代码，这也是 JavaScript 的一个重要设计缺陷。 ECMAScript （以下简称 ES6 ）已经通过引入块级作用域并配合 let、const 关键字，来避开这种设计缺陷，但是由于 JavaScript 需要保持向下兼容，所以变量提升在相当长一段时间内还会继续存在。


#### 作用域
作用域是指在程序中定义的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。
在 ES6 之前，ES 的作用域只有两种： 全局作用域和函数作用域。
变量提升所带来的问题：

1. 变量容易在下被察觉的情况下被覆盖掉
1. 本应销毁的变量没有被销毁
```javascript
function foo(){
	for(var i = 0; i < 10; i++){}
  console.log(i)
}
foo();
```
#### JavaScript 是如何支持块级作用域
```javascript
function foo(){
	var a = 1;
  let b = 2;
  {
  	let b = 3;
    var c = 4;
    let d = 5;
    console.log(a)
    console.log(b)
  }
  console.log(b)
  console.log(c)
  console.log(d)
}
foo();
```

- 编译并创建执行上下文

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613114484426-072ee7d7-b723-4ff7-9639-bd91a1d22afa.png#height=400&id=u3rE0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=860&originalType=binary&ratio=1&size=122361&status=done&style=none&width=860)

- 继续执行代码

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613114501211-92a829f2-b032-4565-8d51-9cb9799e00a8.png#height=390&id=Zwq8b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=390&originWidth=863&originalType=binary&ratio=1&size=122304&status=done&style=none&width=863)

- 变量查找过程

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613114522544-00d1b9f5-59eb-4e6f-b7e7-680e6dbe4da5.png#height=346&id=vdCaB&margin=%5Bobject%20Object%5D&name=image.png&originHeight=346&originWidth=858&originalType=binary&ratio=1&size=129661&status=done&style=none&width=858)

- 最终执行上下文

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613114539324-cefaba8d-4d2d-4be5-ae2d-812ae0a1f9f2.png#height=403&id=tiPOy&margin=%5Bobject%20Object%5D&name=image.png&originHeight=403&originWidth=857&originalType=binary&ratio=1&size=123854&status=done&style=none&width=857)
#### 作用域链和闭包
词法作用域是代码阶段就决定好的，和函数是怎么调用的没有关系。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613115388638-226625b8-06d2-4d11-b91c-42246c014b06.png#height=542&id=psx8t&margin=%5Bobject%20Object%5D&name=image.png&originHeight=542&originWidth=863&originalType=binary&ratio=1&size=167659&status=done&style=none&width=863)
```javascript
function bar(){
	console.log(myName)
}
function foo(){
	var myName = "AAA"
  bar()
}
var myName = "BBB"
foo();
```
其实在每个执⾏上下⽂的变量环境中，都包含了⼀个外部引⽤，⽤来指向外部的执⾏上下⽂，我们把 这个外部引⽤称为 outer。当⼀段代码使⽤了⼀个变量时，JavaScript 引擎⾸先会在“当前的执⾏上 下⽂”中查找该变量，⽐如上⾯那段代码在查找 myName 变量时，如果在当前的变量环境中没有查 找到，那么 JavaScript 引擎会继续在 outer 所指向的执⾏上下⽂中查找。
#### 闭包
```javascript
function foo(){
	var myName = "AAA"
  let test1 = 1
  const test2 = 2
  var innerBar = {
  	getName: function(){
    	console.log(test1)
      return myName
    },
    setName: function(newName){
    	myName = newName
    }
  }
  return innerBar
}
var bar = foo()
bar.setName("王蛋蛋")
bar.getName()
console.log(bar.getName())
```
根据词法作⽤域的规则，内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变 量，所以当 innerBar 对象返回给全局变量 bar 时，虽然 foo 函数已经执⾏结束，但是getName 和 setName 函数依然可以使⽤ foo 函数中的变量 myName 和 test1。


foo 函数执⾏完成之后，其执⾏上下⽂从栈顶弹出了，但是由于返回的 setName 和 getName ⽅法中 使⽤了 foo 函数内部的变量 myName 和 test1，所以这两个变量依然保存在内存中。这像极了 setName 和 getName ⽅法背的⼀个专属背包，⽆论在哪⾥调⽤了 setName 和 getName ⽅法，它们 都会背着这个 foo 函数的专属背包。这个背包称为 foo 函数的闭包。


当调⽤ bar.getName 的时候，右边 Scope 项就体现出了作⽤域链的情况：Local 就是当前的 getName 函数的作⽤域，Closure(foo) 是指 foo 函数的闭包，最下⾯的 Global 就是指全局作⽤域， 从“Local‒>Closure(foo)‒>Global”就是⼀个完整的作⽤域链。


闭包：在 JavaScript 中，根据词法作⽤域的规则，内部函数总是可以访问其外部函数中声明的变量， 当通过调⽤⼀个外部函数返回⼀个内部函数后，即使该外部函数已经执⾏结束了，但是内部函数引⽤ 外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。⽐如外部函数是 foo，那么 这些变量的集合就称为 foo 函数的闭包。 
​

通常，如果引⽤闭包的函数是⼀个全局变量，那么闭包会⼀直存在直到⻚⾯关闭；但如果这个闭包以 后不再使⽤的话，就会造成内存泄漏。尽量让它成为⼀个局部变量。
​

### this
全局执行上下文中的 this 指向 window 对象
函数执行上下文中的this:

- 通过函数的 call, apply, bind 方法设置
- 通过对象调用方法设置
- 通过构造函数中设置 new



### 栈空间和堆空间
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135837590-0695bbff-1087-44a7-8a25-248008e6e3cf.png#height=526&id=jU9xX&margin=%5Bobject%20Object%5D&name=image.png&originHeight=526&originWidth=863&originalType=binary&ratio=1&size=142448&status=done&style=none&width=863)
JavaScript 是一种弱类型的，动态的语言。
JavaScript 中的数据类型一共有 8 种，它们分别是：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613116852830-5bbfa1f3-3bfa-4224-acc0-8950b87119b8.png#height=392&id=aTt7y&margin=%5Bobject%20Object%5D&name=image.png&originHeight=392&originWidth=862&originalType=binary&ratio=1&size=192108&status=done&style=none&width=862)
原始数据类型是存储在栈空间中，引用类型的数据是存储在堆空间中的


### 垃圾回收
JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文。
要回收堆中的垃圾数据，就需要用到 JavaScript 中的垃圾回收器了。
#### 代际假说和分代收集
代际假说有以下两个特点：第一个是大部分对象在内存中存在的时间很短，简单来说，就是很多对象一经分配内存，很快就变得不可访问；第二个是不死的对象，会活得更久。
V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。
副垃圾回收器，主要负责新生代的垃圾回收。主垃圾回收器，主要负责老生代的垃圾回收。
垃圾回收器的工作流程：

- 第一步是标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。
- 第二步是回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。
- 第三步是做内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为内存碎片。当内存中出现大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如接下来我们要介绍的副垃圾回收器。
#### 副垃圾回收器
Scavenge 算法：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135164401-1286b315-0788-48ad-9e3a-b1aea6156fee.png#height=364&id=lTj9k&margin=%5Bobject%20Object%5D&name=image.png&originHeight=364&originWidth=859&originalType=binary&ratio=1&size=98393&status=done&style=none&width=859)
角色翻转的操作还能让新生代中的这两块区域无限重复使用下去。经过两次垃圾回收依然还存活的对象，会被移动到老生区中。


#### 主垃圾回收器
采用标记 - 消除 （Mark-Sweep）的算法进行清除
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135317222-7d1a73ea-256f-4a15-a245-048f826ad1e1.png#height=672&id=bkhK5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=672&originWidth=859&originalType=binary&ratio=1&size=112714&status=done&style=none&width=859)
一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做**全停顿**（Stop-The-World）。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135480120-ce9972c8-3190-4eba-80e3-99593551f48d.png#height=228&id=FniKb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=228&originWidth=862&originalType=binary&ratio=1&size=61416&status=done&style=none&width=862)
增量标记（Incremental Marking）算法
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135522322-36286ddd-fbb2-4721-9686-496524f60abb.png#height=247&id=sRd3S&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=835&originalType=binary&ratio=1&size=57923&status=done&style=none&width=835)


### 编译器和解释器
编译型语言在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了。比如C/C++、GO 等都是编译型语言。需由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行。比如 Python、JavaScript 等都属于解释型语言
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613135866851-86c8a025-6929-4055-99e7-4cb9a9bc22ac.png#height=319&id=EwjsL&margin=%5Bobject%20Object%5D&name=image.png&originHeight=319&originWidth=859&originalType=binary&ratio=1&size=94489&status=done&style=none&width=859)

- 在编译型语⾔的编译过程中，编译器⾸先会依次对源代码进⾏词法分析、语法分析，⽣成抽象语法 树（AST），然后是优化代码，最后再⽣成处理器能够理解的机器码。如果编译成功，将会⽣成⼀ 个可执⾏的⽂件。但如果编译过程发⽣了语法或者其他的错误，那么编译器就会抛出异常，最后的 ⼆进制⽂件也不会⽣成成功。 
- 在解释型语⾔的解释过程中，同样解释器也会对源代码进⾏词法分析、语法分析，并⽣成抽象语法 树（AST），不过它会再基于抽象语法树⽣成字节码，最后再根据字节码来执⾏程序、输出结果。



#### V8 是如何执行一段 JavaScript 代码的

- **将源代码转换为抽象语法树，并⽣成执⾏上下⽂ AST**。AST 是⾮常重要的⼀种数据结构，在很多项⽬中有着⼴泛的应⽤。其中最著名的⼀个项⽬是 Babel。Babel 是⼀个被⼴泛使⽤的代码转码器，可以将 ES6 代码转为 ES5 代码，这意味着你可以现 在就⽤ ES6 编写程序，⽽不⽤担⼼现有环境是否⽀持 ES6。Babel 的⼯作原理就是先将 ES6 源码转换 为 AST，然后再将 ES6 语法的 AST 转换为 ES5 语法的 AST，最后利⽤ ES5 的 AST ⽣成 JavaScript 源 代码。
1. 第⼀阶段是分词（tokenize），⼜称为词法分析
1. 第⼆阶段是解析（parse），⼜称为语法分析

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613136376555-ddc97062-2e39-483a-83b5-67797dc94028.png#height=350&id=pAOR3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=350&originWidth=861&originalType=binary&ratio=1&size=123403&status=done&style=none&width=861)

- 生成字节码

解释器 Ignition 就登场了，它会**根据 AST ⽣成字节码，并解释执⾏字节码**。 
字节码就是介于 AST 和机器码之间的⼀种代码。但是与特定类型的机器码⽆关，字节码需要通过解释 器将其转换为机器码后才能执⾏。

- 执行代码

**⽣成字节码之后，接下来就要进⼊执⾏阶段**了。通常，如果有⼀段第⼀次执⾏的字节码，解释器 Ignition 会逐条解释执⾏。到了这⾥，相信你已经发现了，解释器 Ignition 除了负责⽣成字节码之 外，它还有另外⼀个作⽤，就是解释执⾏字节码。在 Ignition 执⾏字节码的过程中，如果发现有热点 代码（HotSpot），⽐如⼀段代码被重复执⾏多次，这种就称为热点代码，那么后台的编译器 TurboFan 就会把该段热点的字节码编译为⾼效的机器码，然后当再次执⾏这段被优化的代码时，只 需要执⾏编译后的机器码就可以了，这样就⼤⼤提升了代码的执⾏效率。 
​

字节码配合解释器和编译器是最近⼀段时间很⽕的技术**即时编译（JIT）**
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613136500888-a09e783b-0790-4c25-a37e-89075757e77a.png#height=703&id=lVJas&margin=%5Bobject%20Object%5D&name=image.png&originHeight=703&originWidth=609&originalType=binary&ratio=1&size=88288&status=done&style=none&width=609)
### 消息队列和事件循环
要想在线程运⾏过程中，能接收并执⾏新的任务，就需要采⽤事件循环机制。 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613271868426-f5db8ff4-d3b1-46cc-9917-8009bfc8f38a.png#height=414&id=kHz4d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=414&originWidth=585&originalType=binary&ratio=1&size=83895&status=done&style=none&width=585)
消息队列是⼀种数据结构，可以存放要执⾏的任务。它符合队列“先进先出”的特点，也就是说要添加任务的话，添加到队列的尾部；要取出任务的话，从队列头部去取。消息队列：输⼊事件（⿏标滚动、点击、移动）、微任务、⽂件读写、WebSocket、JavaScript 定时器等等。除此之外，消息队列中还包含了很多与⻚⾯相关的事件，如 JavaScript 执⾏、解析 DOM、样式计算、布局计算、CSS 动画等。 
#### ⻚⾯使⽤单线程的缺点
⻚⾯线程所有执⾏的任务都来⾃于消息队列。消息队列是“先进先出”的属性，也就是说放⼊队列中的任务，需要等待前⾯的任务被执⾏完，才会被执⾏。


#### 如何处理⾼优先级的任务

- 如果 DOM 发⽣变化，采⽤同步通知的⽅式，会影响当前任务的执⾏效率；如果采⽤异步⽅式，⼜会影响到监控的实时性。 
- 通常我们把消息队列中的任务称为宏任务，每个宏任务中都包含了⼀个微任务队列，在执⾏宏任务的过程中，如果 DOM 有变化，那么就会将该变化添加到微任务列表中，这样就不会影响到宏任务的继续执⾏，因此也就解决了执⾏效率的问题。



#### 单个任务执⾏时⻓过久的问题
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613272004708-d8bba5c6-3444-4b73-8e67-38e1b74fde4f.png#height=208&id=FOKaD&margin=%5Bobject%20Object%5D&name=image.png&originHeight=208&originWidth=664&originalType=binary&ratio=1&size=35805&status=done&style=none&width=664)
如果在执⾏动画过程中，其中有个 JavaScript 任务因执⾏时间过久，占⽤了动画单帧的时间，这样会给⽤⼾制造了卡顿的感觉，这当然是极不好的⽤⼾体验。针对这种情况，JavaScript 可以通过回调功能来规避这种问题，也就是让要执⾏的 JavaScript 任务滞后执⾏。
​

#### 宏任务

- 渲染事件（如解析 DOM、计算布局、绘制）； 
- ⽤⼾交互事件（如⿏标点击、滚动⻚⾯、放⼤缩⼩等）； 
- JavaScript 脚本执⾏事件； 
- ⽹络请求完成、⽂件读写完成事件。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613272087441-e0368baf-bb55-4549-a0f5-2dd725207904.png#height=169&id=fa0QF&margin=%5Bobject%20Object%5D&name=image.png&originHeight=169&originWidth=513&originalType=binary&ratio=1&size=46636&status=done&style=none&width=513)


#### 微任务
微任务就是⼀个需要异步执⾏的函数，执⾏时机是在主函数执⾏结束之后、当前宏任务结束之前。当 JavaScript 执⾏⼀段脚本的时候，V8 会为其创建⼀个全局执⾏上下⽂，在创建全局执⾏上下⽂的同时，V8 引擎也会在内部创建⼀个微任务队列。 
MutationObserver、Promise 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613272145369-7f4aacf2-2bff-4d7f-8a32-3b0c50fa2271.png#height=241&id=Ek6GG&margin=%5Bobject%20Object%5D&name=image.png&originHeight=241&originWidth=530&originalType=binary&ratio=1&size=81391&status=done&style=none&width=530)
#### 浏览器与node 的 Event Loop 执行区别 

- **浏览器 Event Loop** 

**当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最		      前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。**

- **node Event Loop**

**外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)–>定时器检测阶段(timer)–>I/O 事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段**


**总结：浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务**。


#### Promise
异步编程模型
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613272210884-965713c1-f1f1-42e0-b0de-6b401f63aef0.png#height=365&id=LGcjq&margin=%5Bobject%20Object%5D&name=image.png&originHeight=365&originWidth=557&originalType=binary&ratio=1&size=72258&status=done&style=none&width=557)
封装异步代码，让处理流程变得线性 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1476433/1613272300354-0cd7de85-6d29-4ffb-9a37-731d8c749ba2.png#height=325&id=usYMt&margin=%5Bobject%20Object%5D&name=image.png&originHeight=325&originWidth=856&originalType=binary&ratio=1&size=94135&status=done&style=none&width=856)
Promise：消灭嵌套调⽤和多次错误处理

- 为什么要引⼊微任务？由于promise采⽤.then延时绑定回调机制，⽽new Promise时⼜需要直接执⾏promise中的⽅法，即发⽣了先执⾏⽅法后添加回调的过程，此时需等待then⽅法绑定两个回调后才能继续执⾏⽅法回调，便可将回调添加到当前js调⽤栈中执⾏结束后的任务队列中，由于宏任务较多容易堵塞，则采⽤了微任务
- Promise 是如何实现回调函数返回值穿透的？⾸先Promise的执⾏结果保存在promise的data变量中，然后是.then⽅法返回值为使⽤resolved或rejected回调⽅法新建的⼀个promise对象，即例如成功则返回new Promise（resolved），将前⼀个promise的data值赋给新建的promise 
- Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获promise内部有resolved_和rejected_变量保存成功和失败的回调，进⼊.then（resolved，rejected）时会判断rejected参数是否为函数，若是函数，错误时使⽤rejected处理错误；若不是，则错误时直接throw错误，⼀直传递到最后的捕获，若最后没有被捕获，则会报错。可通过监听unhandledrejection事件捕获未处理的promise错误























