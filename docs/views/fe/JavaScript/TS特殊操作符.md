---
title: 【TypeScript】- 特殊操作符
sidebar: "auto"
date: 2021-04-11
tags:
  - 基础
categories:
  - JavaScript
---


## `keyof`

可以获取某个类型的所有 key(键), 通过 key 的类型来生成一个新的联合类型

```ts
type Point = { x: number; y: number };
type P = keyof Point;

type Point1 = { [x: number]: number, [y: string]: number };
type P1 = keyof Point1;
// type P1 = number | string

type Point2 = { x: number, [y: string]: number };
type P2 = keyof Point1;
// type P2 = number | string

// 获取属性用法

function getProp<T extends object, K extends keyof  T>(obj:T, key:K){
  return obj[key];
}
```

参考链接 [TS keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

## `typeof`

typeof 本来就是 js 中的关键字，不过这里可以扩展一些特别的方法,可以通过 typeof 中推断的类型创建类型

```ts
function fn() {
  return {
    a: 1,
    b: 'name'
  }
}

let _name = '小李'

type T0 = typeof _name;
// type T0 = string

type T1 = ReturnType<typeof fn>
// type T1 = {
//     a: number;
//     b: string;
// }
```

参考链接 [TS typeof](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)


## `in keyof`

迭代 O 对象的 key，并且判断是否属于 O, 生成一个新的类型

```ts

type K = {
  x: string | number,
  y: string | number
}

type Point<O> = {
  [K in keyof O]: O[K]
}

var b: Point<K> = {
  x: 2,
  y: '32px',
  z: false // z error z error 不能将类型“{ x: number; y: string; z: boolean; }”分配给类型“Point<K>”。对象文字可以只指定已知属性，并且“z”不在类型“Point<K>”中。
}
```

参考链接 [TS Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)