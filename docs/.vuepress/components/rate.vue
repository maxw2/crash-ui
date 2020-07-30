<template>
  <div class="rate"></div>
</template>
<script>
import { Rate } from "../../../index";

export default {
  name: 'rate',
  mounted() {
    const rate = new Rate(".rate");
  }
};
</script>
<style scoped>
</style>