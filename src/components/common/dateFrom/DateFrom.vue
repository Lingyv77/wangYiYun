<template>
  <div class="date-from">
    <div class="year-list">
      <get-scroll-item :list="yearList" @getData="getYear" :date="yearValue"/>
    </div>
    <div class="month-list">
      <get-scroll-item :list="monthList" @getData="getMonth" :date="monthValue"/>  
    </div>
    <div class="day-list">
      <get-scroll-item :list="dayList" @getData="getDay" :date="dayValue"/>
    </div>
  </div>
</template>

<script>
  import GetScrollItem from 'components/common/getScrollItem/GetScrollItem';
  export default {
    name: 'DateFrom',
    components: {
      GetScrollItem
    },
    setup() {
      const add = (num) => {
        if (num < 10) {
          return "0"+num;
        }else {
          return ""+num
        }
      }

      const date = new Date();
      const yearValue = date.getFullYear() + '';
      const monthValue = add(date.getMonth() + 1);
      const dayValue = add(date.getDate());

      return {
        add,
        date,
        yearValue,
        monthValue,
        dayValue
      }
    },
    data() {
      return {
        yearList: [],
        monthList: [],
        dayList: [],
        year: '--',
        month: '--',
        day: '--',

      }
    },
    created() {
      this.yearList = this.createItemArray(1600, this.date.getFullYear());
      this.monthList = this.createItemArray(1,12);
      this.dayList = this.createItemArray(1,this.getDayCount());
    },
    methods: {
      //用户锁定年
      getYear(data) {
        this.year = data;
        this.dayList = this.createItemArray(1,this.getDayCount());
        this.$emit('year',data);
      },
      //用户锁定月
      getMonth(data) {
        this.month = Number(data);
        this.dayList = this.createItemArray(1,this.getDayCount());
        this.$emit('month',data);
      },
      //用户锁定日
      getDay(data) {
        this.day = data;
        this.$emit('day',data);
      },
      createItemArray(from, finish) {
        let arr = [''];
        for(let i = from;i <= finish; i++) { 
          arr.push(this.add(i));
        }
        arr.push('');
        return arr;
      },
      getDayCount() {
        switch(this.month){
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            return 31;
          case 2:
            if(this.year%4 == 0&&this.year%100 != 0 ||this.year%400 == 0){ //闰年
              return 29;
            }else{
              return 28;
            }
        default:
          return 30;
        }
      }
    },
  }
</script>

<style scoped>
  .date-from {
    display: flex;
    background-color: rgb(47, 46, 46);
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
  }
    .date-from > div {
      background-color: rgb(25, 25, 25);
      margin: 0 3px;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .year-list {
      flex: 5;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .month-list {
      flex: 4;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .day-list {
      flex: 4;
      display:flex;
      justify-content: center;
      align-items: center;
    }
</style>