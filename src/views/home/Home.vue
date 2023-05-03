<template>
<div class="container">
  <el-carousel height="calc(100vh - 60px)">
    <!-- 每一项 -->
    <el-carousel-item :key="1">
      <div :style="{backgroundImage: `url(${require('@/assets/home1.jpg')})`}"></div>
    </el-carousel-item>

     <el-carousel-item :key="2">
      <div :style="{backgroundImage: `url(${require('@/assets/home2.jpg')})`}"></div>
    </el-carousel-item>
         <el-carousel-item :key="3">
      <div :style="{backgroundImage: `url(${require('@/assets/home3.jpg')})`}"></div>
    </el-carousel-item>

    <!-- 文字 -->
  <div class="center">互联网 + 时代</div>

  </el-carousel>
</div>

</template>

<script>

</script>

<style scoped>
.container{
  color: black;
  position: relative;
}



/* 背景 */
.el-carousel div{
  width: 100%;
  height: 100%;
  background-size: cover; 
}

/* 文字居中 */
.el-carousel .center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height: 100px;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  color: white;
}
</style>