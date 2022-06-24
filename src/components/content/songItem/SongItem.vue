<template>
  <div class="song-item">
    <div v-for="(item, index) in songList" :key="index" class="item flex" @click="play(item.id)">
      <div class="index"> {{ index + 1 }} </div>
      <div class="song-info">
        <div class="name"> 
          {{ item.songName }} <span v-if="item.yuanc.length !== 0" class="yuanc"> {{ item.yuanc[0] }} </span>
        </div>
        <div class="singer">
          <span v-for="(item, index) in item.singer" :key="index"> {{ item.name }} </span>
          <span> - {{ item.zhuanji }}</span>
        </div>
      </div>
      <div class="mv">
        <img src="~assets/imgs/common/mv.svg" alt=""
             v-if="item.mv !== 0"
             @click.stop="playMv(item.mv)">
      </div>
      <div class="more">
        <img src="~assets/imgs/common/sandian.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SongItem",
    props: {
      songList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      play(id) {
        this.$router.push('/PlayMusic/' + id);
      },
      playMv(mid) {
        console.log(mid);
      }
    },
  }
</script>

<style scoped>
  .song-item {
    background-color: white;
    padding: 0 10px;
    font-size: 16px;
  }
    .item {
      height: 50px;
      border-bottom: 1px solid #e2e2e2ea;
    }
      .index {
        width: 30px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin-right: 10px;
      }
      .song-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
        .singer {
          font-size: 12px;
          color: #868686;
        }
        .name, .singer {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      .mv {
        height: 100%;
        width: 40px;
      }
        .mv img {
          margin-top: 11px;
          margin-left: 10px;
          width: 22px;
          height: 22px;
        }
      .more {
        height: 100%;
        width: 40px;
      }
        .more img {
          margin-top: 11px;
          margin-left: 10px;
          width: 22px;
          height: 22px;
        }
</style>