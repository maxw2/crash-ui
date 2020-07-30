---
title: pagination - 分页
---

## 效果预览

<pagination />

## 代码演示

``` html
<div class='pagination'></div>
```

``` js
import { Pagination } from 'crash-ui'

const pagination = new Pagination('.pagination', {
    total: 100, // 总数
    pageSize: 10 // 每页显示数量
})
```

## API

| 方法     |         描述         |     属性 |
|----------|:--------------------:|:---------:|
| onChange | 页数改变时触发该事件 | Function |
| remove   | 清除事件            | None     |
