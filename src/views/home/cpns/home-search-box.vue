<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

const router = useRouter()

//位置
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
const cityClick = () => {
  router.push('/city')
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('获取位置成功',res);
  }, err => {
    console.log('位置获取失败',err);
  }, {
    // 配置
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  })
}


// 日期范围
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)


const showCalendar = ref(false)

const onConfirm = (value) => {
  console.log('value',value);
  showCalendar.value = false
}

</script>

<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="section location bottom-gray-line">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">杭州</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">9月1号</span>
        </div>
        <div class="stay">共1晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">9月2号</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" :round="false" type="range" @confirm="onConfirm" />
    <div class="section bottom-gray-line"></div>
    <div class="section bottom-gray-line"></div>

  </div>
</template>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 108px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    .text {
      position: relative;
      top: 1px;
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

</style>
