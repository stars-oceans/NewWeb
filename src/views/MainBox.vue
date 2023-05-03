<template>
 <Navber/>
 <!-- mainbox 的子路路由 -->
  <router-view/>

</template>

<script setup>
import Navber from '@/components/navber/Navber'

</script>

<style scoped>
  .activeColor{
    color: green;
  }

</style>