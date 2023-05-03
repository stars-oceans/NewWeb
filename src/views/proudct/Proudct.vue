<template>
  <el-carousel v-if="loopList.length!==0" height="calc(100vh - 60px)" direction="vertical" :autoplay="false">
    <el-carousel-item :style="{ background : `url(http://localhost:3000${item.cover})` }" class="img" v-for="item in loopList" :key="item._id">
      <!-- 卡片 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            {{ item.title }}
          </div>
        </template>
        <div>{{ item.detail }}</div>
        <div>{{ item.introduction }}</div>
        <div>{{ setTime(item.ediTime) }}</div>
      </el-card>

    </el-carousel-item>
  </el-carousel>

  <el-empty v-else description="暂无产品" />
</template>

<script setup>
import { ref, onMounted, computed, } from "vue";

import axios from "axios";
import moment from 'moment'
moment.locale('zh-cn');         // zh-cn


// 定义接手数据的数组
let loopList = ref([])

onMounted(async () => {
  const { data: res } = await axios.get('/adminapi/Product/findList')
  console.log(res);
  loopList.value = res.data

  console.log(loopList.value);
})

// 格式化时间的函数
const setTime = (time) => {
  return moment(time).format("MMM Do YY")
}

</script>

<style scoped>


.img{
  width: 100%;
  height: 100%;
  background-size: cover !important;
  /* height:200px; */
}

.box-card{
  width: 50%;
  height: 100%;
  opacity: 0.7;
  border-radius: 0;
}
</style>