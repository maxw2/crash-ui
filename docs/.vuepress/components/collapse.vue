<template>
  <div class="collapse">
    <div class="content">
      <div class="title">This is panel header 1</div>
      <div
        class="context"
      >A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
    <div class="content">
      <div class="title">This is panel header 2</div>
      <div
        class="context"
      >A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
    <div class="content">
      <div class="title">This is panel header 3</div>
      <div
        class="context"
      >A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
    </div>
  </div>
</template>
<script>
import { Collapse } from "../../../index";

export default {
  mounted() {
    const collapse = new Collapse(".collapse");
  },
};
</script>
<style scoped>
.content {
  border-bottom: 1px solid #d9d9d9;
}
.title {
  background: #f1f1f1;
  padding: 15px 8px;
  padding-left: 20px;
  line-height: 10px;
  cursor: pointer;
  /* transition: all 0.3s; */
}
.context{
  padding:0px 8px;
  box-sizing: border-box;
}
.arrowDefCss {
  margin-right: 15px;
}
</style>