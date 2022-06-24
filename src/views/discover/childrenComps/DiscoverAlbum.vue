<template>
  <div class="discove-album">
    <top-title :title="['新碟上架','查看更多']"/>
    <transform-swiper :song-list="albumList"/>
  </div>
</template>

<script>
  import TopTitle from 'components/content/topTitle/TopTitle'
  import TransformSwiper from 'components/content/transformSwiper/TransformSwiper'

  import { getNewAlbum } from 'network/discover'

  export default {
    name: "DiscoverAlbum",
    data(){
      return {
        albumList: [[],[],[],[]],
        countReduce: 3, //准许初次加载次数
      }
    },
    components: { 
      TopTitle,
      TransformSwiper 
    },
    created() {
      this.getNewAlbum();
    },
    methods: {
      getNewAlbum() {
        clearTimeout(this.newAlbum);
        if (this.countReduce) {
          this.countReduce--;
          getNewAlbum(0, 9).then(res => {
            // 存取需要的值数
            const list = []
            const result = res.monthData;
            for (const index in result) {
              if (index < this.albumList.length * 3) {
                list.push(result[index]);
              }
            }
            let listIndex = 0;
            for (let i = 0; i < this.albumList.length; i++) {
              let k = 3;
              while(k--) {
                this.albumList[i].push({
                  id: list[listIndex].id, // 歌曲id
                  picUrl: list[listIndex].picUrl, // 歌曲封面
                  name: list[listIndex].name, // 歌曲名称
                  artists: list[listIndex].artists,  // 演唱者 
                })
                listIndex++;
              }
            }
          }).catch(() => {
            this.newAlbum = setTimeout(() => {
              this.getNewAlbum();
            }, 3000);
          })
        }
      }
    },
  }
</script>

<style scoped>
  .discove-album {
    overflow: hidden;
  }
</style>