<template>
  <div class="anchor-every-day">
    <anchor-info :data="data" :radius="true"/>
  </div>
</template>

<script>
  import AnchorInfo from 'components/content/anchorInfo/AnchorInfo'
  
  import { getAnchorRanking } from 'network/radioStation'
  
  import { toStringNum } from 'common/common'

  export default {
    nane: 'anchorEveryDay',
    components: { AnchorInfo },
    data() {
      return {
        data: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    created() {
      this.firstAnchorEveryDay();
    },
    methods: {
      firstAnchorEveryDay() {
        clearTimeout(this.hotTimer);
        if (this.countReduce) {
          this.countReduce--;
          getAnchorRanking().then(res => {
            for (let item of res.data.list) {
              this.data.push({
                name: item.nickName, //名
                id: item.id, //id
                picUrl: item.avatarUrl, //图片
                rank: item.rank, //当前排名
                docs:  toStringNum(item.score),
                infoList: ['热度 '+ toStringNum(item.score), item.userFollowedCount+ '粉丝'], //热度
                changeRankCount: item.lastRank - item.rank//递增递减排名排名
              })
            }
          }).catch(() => {
            this.anchorTimer = setTimeout(() => {
              this.firstAnchorEveryDay();
            }, 3000);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>