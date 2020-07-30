<template>
  <div class="calender"></div>
</template>

<script>
import {Calender} from '../../../index'

export default {
    name:"calender",
    mounted(){
        const calender = new Calender('.calender')
    }
}
</script>

<style>

  /* th,td{
    border: 0px;
    padding: 0px;
  } */

</style>