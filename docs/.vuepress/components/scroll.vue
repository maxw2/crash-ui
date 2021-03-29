<template>
  <div class="scroll">
    <div class="content">
      <div class="child" v-for="val in list" :style="{ background: val.color }">
        {{ val.color }}
      </div>
    </div>
  </div>
</template>
<script>
import { Scroll } from "../../../index";

export default {
  name: "scroll",
  data() {
    return {
      list: [
        {
          color: "blue",
          test: "1",
        },
        {
          color: "green",
          test: "2",
        },
        {
          color: "red",
          test: "3",
        },
        {
          color: "pink",
          test: "4",
        },
      ],
    };
  },
  mounted() {
    const _Scroll = new Scroll(".scroll", {
      scrollX:true
    });
  },
};
</script>
<style scoped>
.scroll {
  width:280px;
  height: 140px;
}
.child {
  width: 200px;
  height: 100px;
  margin-right:20px;
}
</style>
