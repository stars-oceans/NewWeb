<template>

  <div class="container">
    <!-- bg -->
    <div class="newsheader" :style=" { backgroundImage : `url(${ require('@/assets/newsbg.jpg')})` }"></div>
    <!-- 搜索框 -->
    <div class="search">
      <el-popover :visible="visible" placement="bottom" title="检索结果" width="50%" trigger="click" content="this is content, this is content, this is content">
        <template #reference>
          <el-input @blur="visible = false" @input="visible = true" v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search" type="Search" size="large" />
        </template>
        <div v-if="searchnewslist.length">
          <p @click="handleChangepage(item._id)" v-for="item in searchnewslist" :key="item._id">{{ item.title }}</p>
        </div>
        <!--如果 为空 -->
        <div v-else>
          <el-empty description="空空如也" :image-size="100" />
        </div>
      </el-popover>
    </div>

    <!-- 新闻列表 -->
    <div class="topnews">
      <el-row :gutter="20">
        <el-col @click="handleChangepage(item._id)" :span="6" v-for="item in topNewsList" :key="item._id">
          <el-row>
            <el-col>
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div :style="{ backgroundImage : `url(http://localhost:3000${item.cover})`}" class="img"></div>
                <div style="padding: 14px">
                  <span>{{ item.title }}</span>
                  <div class="bottom">
                    <time class="time">{{formatDate(item.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- tabber -->
    <el-tabs style="margin : 20px;" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane ::key="item.name" v-for="item in tabList" :label="item.label" :name="item.name">
        <el-row :gutter="24">
          <el-col :span="18">
            <div  @click="handleChangepage(data._id)" v-for="data in tabnews[item.name]" :key="data._id" style="margin:10px;">

              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div :style="{ backgroundImage : `url(http://localhost:3000${data.cover})`}" class="tab-img"></div>
                <div style="padding: 14px;float: left;">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time">{{formatDate(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="margin-top:80px">
              <el-timeline-item style="height : 140px" :hollow='true' v-for="data in tabnews[item.name]" :key="data._id" :timestamp="formatDate(data.editTime)">
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 返回顶部 -->
  <el-backtop :right="100" :bottom="100" />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { Calendar, Search } from '@element-plus/icons-vue'
import _ from 'lodash'
import { useRouter } from 'vue-router'
// 导入 vuex 
import { useStore }  from 'vuex'

const store = useStore()
 const router  = useRouter()

// 格式化时间
function formatDate(time) {
  var date = new Date(time);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,//月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  var newTime = year + '-' +
    month + '-' +
    day + ' ' +
    hour + ':' +
    min + ':' +
    sec;
  return newTime;
}
let  storeNewsList = null

// 双向绑定的数据
let searchText = ref([])
// 是否展示 pop
let visible = ref(false)
// 数据的数组
let newList = ref([])

// 开始的 钩子 调用 axios 请求
onMounted(async function () {
  let { data } = await axios.get('/webapi/news/list')
  // console.log(data);
  newList.value =  data.data
  // console.log(newList.value);
 storeNewsList =  data.data.slice(0, 4)
  store.commit('uploadNewList', storeNewsList)
})

// 这是 搜索框下面显示的 pop 的值的计算属性
const searchnewslist = computed(
  () => searchText.value ?
  // 查询的关键语句
    newList.value.filter(item => item.title.includes(searchText.value))
    : [])
const topNewsList = computed(function () {
  return newList.value.slice(0, 4)
})  

// tabbar

const activeName = ref(1)

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const tabList = [
  {
    label: '最新动态',
    name: 1,
  },
  {
    label: '典型案例',
    name: 2,
  },
  {
    label: '最新公告',
    name: 3,
  },
]

const tabnews = computed(() => {
  return _.groupBy(newList.value, item => item.category)
}

)

// 跳转
const handleChangepage = (id)=>{
  console.log(id);
  router.push(`/mainbox/new/${id}`)
}
</script>

<style scoped>
.container{
  position: relative;
}
 .newsheader {
  width: 100%;
  height: 600px;
  background-size: cover;
}

/* el-popover */

.search {
  position: absolute;
  top: 450px;
  width: 100%;
  text-align: center;
}
.el-input{
  width: 50%;
}

p{
  padding-left: 20px;
  height: 50px;
  line-height: 50px;

}
p:hover{
  background-color: #f1efef;
  border-radius: 6px;
  padding-left: 20px;
}
/* 新闻列表 */
.topnews{
  margin: 20px ;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  text-align: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* 卡片 */
.time {
  font-size: 12px;
  color: #9a9999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.img {
  height:200px;
  background-size: cover ;
  display: block;
}

/* tabbar */
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.tab-img{
  width: 200px;
  height: 150px;
  background-size: cover;
  float: left;
}
</style>