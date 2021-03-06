---
title: 【TypeScript】- 内置实用类型
sidebar: "auto"
date: 2021-04-15
tags:
  - 基础
categories:
  - JavaScript
---

## `Partial<Type>`

可以将原本必要需要类型变为可选属性的类型

```ts
interface IState {
  title: string;
  description: string;
}
function test(state: IState, newState: Partial<IState>) {
  return { ...state, ...newState };
}

const state: IState = {
  title: "测试",
  description: "这是一个测试"
}
const newState: Partial<IState> = {
  title: "更新测试"
}
// 当然也可以直接修改 interface 初始定位的时候

interface IState {
  title?: string;
  description?: string;
}

```

## `Required<Type>`

Required 和 Partial 相反，把之前的可选类型全部变为必要需要类型

```ts
interface Props {
  a?: number;
  b?: string;
}
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 };
// 类型 "{ a: number; }" 中缺少属性 "b"，但类型 "Required<Props>" 中需要该属性
```

## `Readonly<Type>`

构建具有只读的类型，无法修改

```ts
interface ITest {
  id: number;
}
const todo: Readonly<ITest> = {
  id: 6789,
};
todo.id = 434 // 无法分配到 "id" ，因为它是只读属性
```
## `Record<Keys,Type>`

可以约束对象的 key, props 的类型

```ts

type IBook = 'yuwen' | 'math'

interface IProp {
  price: number;
  page_number: number;
  publish?: string;
}

const math: Record<IBook, IProp> = {
  yuwen: {
    price: 29,
    page_number: 200
  },
  math: {
    price: 49,
    page_number: 100
  }
}
math.yuwen
```

## `Pick<Type, Keys>`

可以取出选择的类型声明中的几个字段生成一个新的类型

```ts
interface IBook {
  title: string;
  description: string;
  price: number;
}
type IBuyBook = Pick<IBook, "title" | "price">;

const buy: IBuyBook = {
  title:'typescript',
  price: 55
}
buy;
```

## `Omit<Type, Keys>`

可以复制原有类型， 并且移出掉不需要的属性生成新的类型

```ts
interface IBook {
  title: string;
  description: string;
  price: number;
  publish: string;
  author: string;
}
type IPreview = Omit<IBook, "author" | "price">
type IPrice = Omit<IBook, "author" | "description" >
const yuwen: IPreview = {
  title: 'yuwen',
  description: '语文',
  publish: 'china'
}

const math: IPrice = {
  title: 'yuwen',
  price: 23,
  publish: 'china'
}
```

## `Exclude<Type, ExcludedUnion>`

通过排除特定的类型， 生成新的一个类型

```ts
type IPrice = Exclude< number | string | (()=> number ), Function>
// type IPrice = number | string
type IName = Exclude< '小李' | '小张' | (()=> string), Function>
// type IName = '小李' | '小张'
```

## `Extract<Type, Union>`

与 Exclude 类型相反，通过匹配两者之间的交集生成一个新的交集类型

```ts
type IPrice = Extract< number | string | (()=> number ), string | boolean>
// type IPrice = string
type IName = Extract< '小李' | '小张' | (()=> string), '小张'| '小李' | boolean>
// type IName = '小张'| '小李'
```

## `NonNullable<Type>`

排除无用值属性，生成一个新的类型。比如 `undefined`,`null`

```ts
type IPrice = NonNullable< number | string | undefined | null>
// type IPrice = number | string
```

## `Parameters<Type>`

通过函数参数构建的一个数组类型, 注意: string, boolean, Function 不满足约束要求

```ts
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
// type T0 = []
type T1 = Parameters<(s: string) => string>;
// type T1 = [s: string]
type T2 = Parameters< <K>(args: K) => K>;
// type T2 = [args: unkonw]
type T3 = Parameters< typeof f1>
// type T3 = [args: {a: number, b: string}]
type T4 = Parameters<any>;
// type T4 = unknow[]
type T5 = Parameters<never>;
// type T5 = never
```

## `ConstructorParameters<Type>`

通过特殊的构建器函数构造数组类型, 不支持 Function 类型


```ts
type T0 = ConstructorParameters<FunctionConstructor>
// type T0 = string[]
type T1 = ConstructorParameters<ErrorConstructor>
// type T1 = [message?: string]
type T2 = ConstructorParameters<ObjectConstructor> // | NumberConstructor | BooleanConstructor | StringConstructor
// type T2 = [value?: any]
type T3 = ConstructorParameters<RegExpConstructor>
// type T3 = [pattern: string | RegExp, flags?: string]
type T4 = ConstructorParameters<any>
// type T4 = unknown[]
```

## `ReturnType<Type>`

构建函数返回值组成的类型

```ts
declare function fn(): { a: number; b: string, c: Function };

type T0 = ReturnType<() => string>;
// type T0 = string
type T1 = ReturnType<(s: string) => void>;
// type T1 = void
type T2 = ReturnType<<T>() => T>;
// type T2 = unknown
type T3 = ReturnType<<T extends U, U extends string[]>() => T>;
// type T3 = string[]
type T4 = ReturnType<typeof fn>
// type T4 = {
//     a: number;
//     b: string;
//     c: Function;
// }
```

## `InstanceType<Type>`

由构造函数实例构成的类型, 不支持 string, number, boolean, Function, Symbol


```ts
class K {
  constructor(){}
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof K>
// type T0 = K

```

## 参考链接

[TS 官网 utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)