<template>
  <div class="anchor-new-men">
    <anchor-info :data="data" :radius="true"/>
  </div>
</template>

<script>

  import AnchorInfo from 'components/content/anchorInfo/AnchorInfo'

  import { getAnchorNewMen } from 'network/radioStation'
  
  import { toStringNum } from 'common/common'

  export default {
    name: 'anchorNewMen',
    components: { AnchorInfo },
    data() {
      return {
        data: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    created() {
      this.firstAnchorNewMen();
    },
    methods: {
      firstAnchorNewMen() {
        clearTimeout(this.hotTimer);
        if (this.countReduce) {
          this.countReduce--;
          getAnchorNewMen().then(res => {
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
              this.firstAnchorNewMen();
            }, 3000);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>