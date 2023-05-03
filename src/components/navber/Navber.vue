<template>
  <div class="navber">
    <!-- :router = "true" 开启路由 模式 -->
    <!-- :default-active="route.fullPath" 当选中时 有高亮显示 -->
    <el-menu :router="true" :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/mainbox/home">首页</el-menu-item>
      <el-menu-item index="/mainbox/proudct">产品</el-menu-item>
      <el-menu-item index="/mainbox/news">新闻</el-menu-item>
    </el-menu>

    <div class="right">企业门户官网</div>
  </div>

</template>

<script setup>
import { useRoute } from "vue-router"
const route = useRoute()
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}




</script>

<style scoped>
/* .el-menu{
align-items: center;  
justify-content: center;  
} */

.navber{
  position: sticky;
  top: 0;
  z-index: 1000;

}

.right{
  position: fixed;
  right: 60px;
  top: 0;
  height: 60px;
  text-align: center;
  line-height: 50px;
}

</style>