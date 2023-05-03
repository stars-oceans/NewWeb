<template>
  <el-row :gutter="24">
    <el-col :span="17" :offset="1">
      <h2>{{ newList.title }}</h2>
      <div class="time">
        {{ handleTime(newList.editTime) }}
        </div>
      
<!-- 分割线 -->
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>

<!-- 内容 -->
      <div v-html="newList.content"></div>
      

    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>最新新闻</span>
          </div>
        </template>
        <div @click="clickItem(item._id)" v-for="item in getNewsList" :key="item._id" class="text item">
          {{item.title}}
              <p class="p1">{{ handleTime(item.editTime) }}</p>
              <hr>
          </div>
          
      </el-card>
    </el-col>

  </el-row>
</template>

<script setup>
import { onMounted, watchEffect,onBeforeUnmount ,ref } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import moment from 'moment'
moment.locale('zh-cn')
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import store from '@/store';
const route = useRoute()
const router = useRouter()

let newList = ref({})

// 这里的 onMounted 改为 
//  watchEffect 监听路由的改变并跳转
const stop =  watchEffect(async () => {
  // console.log('111');
  // console.log(route.params.id);
  if(!route.params.id)return
  const { data: res } = await axios.get('/webapi/news/list',
    {
      params: { _id: route.params.id }
    })
  // console.log(res.data);
  newList.value = res.data[0]
})

onBeforeUnmount(()=>{
  // console.log('222');
  stop()
})

// 处理时间
let handleTime = (time) => {
  return moment(time).format('YYYY MM  Do, a hh点')
}

let  getNewsList = ref([])
getNewsList = store.state.NewsList

// 获取 vuex 的值
// console.log(getNewsList);

// 点击某一项
let clickItem =  async  function(id){
  // console.log(id);
  // 这个方法自己想的 不行
  //  const { data: res } = await axios.get('/webapi/news/list',
  //   {
  //     params: { _id: id }
  //   })
  // console.log(res.data);
  // newList.value = res.data[0]
  router.push(`/mainbox/new/${id}`)

}

</script>

<style lang="less" scoped>
  .el-row{
    margin-top: 20px;
  }
  .time{
    color: #898787;
    font-size: 12px;
  }
  .item{
    margin-top: 10px;
    height:  60px;
    line-height: 30px;
    padding-left: 10px;
   
  }
  .item:hover{
      background-color: #e8e8e8;
    border-radius: 5px;
  }

  .p1{
      font-size: 8px;
      color: #4c4a4a;
    }
</style>