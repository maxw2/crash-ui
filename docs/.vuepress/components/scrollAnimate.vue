<template>
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
</template>

<script>
import { ScrollAnimate } from "../../../index";

export default {
  data() {
    return {};
  },
  mounted() {
    console.log(ScrollAnimate);
    let scrollAnimate = new ScrollAnimate(
      [
        {
          el: ".animate_1",
          animateCss: ["animate__animated", "animate__bounce"],
        },
        {
          el: ".animate_2",
          animateCss: ["animate__animated", "animate__fadeInLeft"],
        },
        {
          el: ".animate_3",
          animateCss: ["animate__animated", "animate__bounceIn"],
        },
        {
          el: ".animate_4",
          animateCss: ["animate__animated", "animate__bounceIn"],
        },
        {
          el: ".animate_5",
          animateCss: ["animate__animated", "animate__flipInY"],
        },
        {
          el: ".animate_6",
          animateCss: ["animate__animated", "animate__lightSpeedInLeft"],
        },
      ],
      ".container"
    );
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 300px;
  overflow: scroll;
}
.scrollAnimate {
  width: 100%;
  height: 1000px;
}
.scrollAnimate .animate {
  width: 50%;
  height: 90px;
  background: orange;
  margin: 200px 0px;
}
.scrollAnimate .animate_1 {
  margin-top: 300px;
}
</style>