<template>
  <div class="swiper">
    <ul class="content">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <div class="arrowLeft" v-on:click="onPrev">
      <svg
        data-button="prev"
        viewBox="64 64 896 896"
        focusable="false"
        class
        data-icon="left"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
        />
      </svg>
    </div>
    <div class="arrowRight" v-on:click="onNext">
      <svg
        data-button="next"
        viewBox="64 64 896 896"
        focusable="false"
        class
        data-icon="right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import { Swiper } from "../../../index";

export default {
  data() {
    return {
      swiper: null,
    };
  },
  mounted() {
    this.swiper = new Swiper(".swiper");
    console.log(this.swiper)
  },
  methods: {
    onPrev() {
      // console.log(this.swiper);
      this.swiper.prev();
    },
    onNext() {
      this.swiper.next();
    },
  },
};
</script>
<style scoped>
.swiper {
  width: 300px;
  height: 200px;
  font-size: 20px;
  text-align: center;
  position: relative;
}
ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.arrowLeft {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: white;
}
.arrowRight {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: white;
}

.swiper li {
  line-height: 200px;
}
.swiper li:nth-child(1) {
  background: pink;
}
.swiper li:nth-child(2) {
  background: blueviolet;
}
.swiper li:nth-child(3) {
  background: orange;
}
</style>