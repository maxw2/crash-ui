---
title: collapse - 折叠面板
---

## 效果预览

<collapse />

## 代码演示

``` html
<div class="collapse">
    <div class="content">
      <div>This is panel header 1</div>
      <div>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
    <div class="content">
      <div>This is panel header 2</div>
      <div>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
    <div class="content">
      <div>This is panel header 3</div>
      <div>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
  </div>
```

``` js
import { Collapse } from 'crash-ui'

let collapse = new Collapse('.collapse')
```

## API

| 方法     |         描述         |   属性   |
|----------|:--------------------:|:--------:|
| onChange | 内容改变时触发该事件 | Function |
| remove   |       清除事件       |   None   |
