<template>
  <div class="anchor-hot">
    <anchor-info :data="data" :radius="true"/>
  </div>
</template>

<script>
  import AnchorInfo from 'components/content/anchorInfo/AnchorInfo'

  import { getAnchorHot } from 'network/radioStation'
  
  import { toStringNum } from 'common/common'

  export default {
    name: 'anchorHot',
    components: { AnchorInfo },
    data() {
      return {
        data: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    created() {
      this.firstAnchorHot();
    },
    methods: {
      firstAnchorHot() {
        clearTimeout(this.hotTimer);
        if (this.countReduce) {
          this.countReduce--;
          getAnchorHot().then(res => {
            for (let item of res.data.list) {
              this.data.push({
                name: item.nickName, //名
                id: item.id, //id
                picUrl: item.avatarUrl, //图片
                rank: item.rank, //当前排名
                infoList: ['热度 '+ toStringNum(item.score), item.userFollowedCount+ '粉丝'], //热度
                changeRankCount: item.lastRank - item.rank//递增递减排名排名
              })
            }
          }).catch(() => {
            this.anchorTimer = setTimeout(() => {
              this.firstAnchorHot();
            }, 3000);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>