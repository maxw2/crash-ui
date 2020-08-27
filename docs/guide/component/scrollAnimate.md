---
title: scrollAnimate - 滚动页面动画
---

## 效果预览

<scrollAnimate />

## 代码演示

``` html
<div class="container">
    <div class="scrollAnimate">
      <div class="animate animate_1">1</div>
      <div class="animate animate_2">2</div>
      <div class="animate animate_3">3</div>
      <div class="animate animate_4">4</div>
      <div class="animate animate_5">5</div>
      <div class="animate animate_6">6</div>
    </div>
  </div>
```

``` js
animateCss 效果使用animate.css组件 
地址：https://animate.style/

import { ScrollAnimate } from 'crash-ui'

let ScrollAnimate = new ScrollAnimate([{
    el:'animate_1',
    animateCss:["animate__animated", "animate__bounce"]
}],scrollEl)

```

## API

| 方法   |   描述   | 属性 |
|--------|:--------:|:----:|
| remove | 清除事件 | None |