<template>
  <div class="pagination"></div>
</template>
<script>
import {Pagination} from '../../../index'

export default {
  mounted() {
    const pagination = new Pagination(".pagination", {
      total: 100,
      pageSize: 10
    });
  }
};
</script>