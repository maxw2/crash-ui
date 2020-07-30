<template>
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
</template>
<script>
import { Tabs } from "../../../index";

export default {
  mounted() {
    const tabs = new Tabs(".tabs");
  },
};
</script>
<style scoped>
.title {
  border-bottom: 1px solid #f0f0f0;
}
.title1 {
  cursor: pointer;
  margin: 0 32px 0 0;
  padding: 8px 0;
}
.content {
  height: 100px;
  overflow: hidden;
  
}
.context {
  padding: 10px 0px;
}
</style>