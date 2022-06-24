<template>
  <div class="top-title">
    <div class="title-text">{{ title[0] }}</div>
    <div class="title-brief" v-if="title[1]">
      <div @click="setRouter">{{ title[1] }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopTitle',
    props: {
      title: {
        type: Array,
        defalut: []
      },
      path: {
        type: String,
        defalut: ''
      }
    },
    methods: {
      setRouter() {
        this.$router.push(this.path);
      }
    },
  }
</script>

<style scoped>
  .top-title {
    display: flex;
    height: 30px;
  }
    .top-title div {
      flex: 1;
      position: relative;
    }
    .title-text {
      font-weight: 600;
      font-size: 16px;
      padding-left: 8px;
    }
    .title-brief {
      font-size: 12px;
    }
      .title-brief div {
        position: absolute;
        right: 0;
        border-radius: 12px;
        border: 1px solid rgb(181, 80, 80);
        padding: 2px 8px;
        margin-right: 8px;
      }
</style>