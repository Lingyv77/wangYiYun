<template>
  <div class="sheet-nav">
    <img src="~assets/imgs/played/bofang.svg" alt=""> 
     <div class="text">
       <span>播放全部<span class="small">(共{{ trackCount }}首)</span></span>       
     </div>
  </div>
</template>

<script>
  export default {
    naem: "SheetNav",
    props: ['trackCount']
  }
</script>

<style scoped>
  .sheet-nav {
    height: 50px;
    padding: 5px 10px;
    display: flex;
  }
    .sheet-nav img {
      vertical-align: middle;
      margin-right: 8px;
    }
    .text {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
      .small {
        font-size: 13px;
  }   
</style>