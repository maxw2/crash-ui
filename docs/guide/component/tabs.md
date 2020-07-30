---
title: tabs - 标签页
---

## 效果预览
<tabs />

## 代码演示

``` html
<div class="tabs">
    <div class="title">
      <div class="title1">tabs1</div>
      <div class="title1">tabs2</div>
      <div class="title1">tabs3</div>
    </div>
    <div class="content">
      <div class="context">Content of Tab Pane 1</div>
      <div class="context">Content of Tab Pane 2</div>
      <div class="context">Content of Tab Pane 3</div>
    </div>
  </div>
```

``` js
import { Rate } from 'crash-ui'

let calendar = new Calendar('.tabs')
```

## API

| 方法     |         描述         |   属性   |
|----------|:--------------------:|:--------:|
| onChange | 内容改变时触发该事件 | Function |
| remove   | 清除事件            | None     |