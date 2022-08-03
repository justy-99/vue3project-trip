<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Toast } from 'vant'
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home'
import useDate from '@/hooks/useDate'
import { formatMonthDay } from '@/utils/format';
import getLoaction from '@/utils/location'

const router = useRouter()

//位置
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
const cityClick = () => {
  router.push('/city')
}
const positionClick = async () => {
  // 腾讯位置服务
  const qqlocation = await getLoaction()
  qqlocation.getIpLocation((res)=>{
    const myLocation = res?.city.replace('市','')
    currentCity.value.cityName = myLocation
    Toast.success(`定位成功:${res?.city}`);
  },(err)=>{
    Toast.fail('定位失败，请重试或手动切换');
  })
  // 浏览器原生
  // navigator.geolocation.getCurrentPosition(res => {
  //   console.log('navigator.geolocation获取位置成功',res.coords)
  // }, err => {
  //   console.log('位置获取失败',err)
  // }, {
  //   // 配置
  //   enableHighAccuracy: true,
  //   timeout: 10000,
  //   maximumAge: 0
  // })
}

// 日期范围
const { startDate, endDate, stayCount, formatCalendar } = useDate()
const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
// 日期弹窗标识
const showCalendar = ref(false)
  // 设置日期
const onConfirm = (value) => {
  startDate.value = value[0]
  endDate.value = value[1]
  // 关闭弹窗
  showCalendar.value = false
}
// 搜索建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 开始搜索
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}

</script>

<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <section class="section location bottom-gray-line">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <img src="@/assets/img/home/icon_location.png" alt="">
        <span class="text">当前位置</span>
      </div>
    </section>
    <!-- 日期选择 -->
    <section class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </section>
    <van-calendar
      v-model:show="showCalendar" 
      :round="true" 
      type="range" 
      color="#ff9854"
      :formatter="formatCalendar"
      :show-confirm="true"
      @confirm="onConfirm" 
    />
    <!-- 筛选条件 -->
    <section class="section bottom-gray-line price-counter">
      <div class="start">价格不限</div>
      <i class="center-line"></i>
      <div class="end">人数不限</div>
    </section>
    <section class="section">
      关键字/位置/品牌/民宿名
    </section>
    <!-- 搜索建议 -->
    <section class="section hot-suggests">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div class="item">
          {{item.tagText?.text}}
        </div>
      </template>
    </section>
    <!-- 搜索按钮 -->
    <section class="section searchBtn">
      <van-button round block @click="searchBtnClick">开始搜索</van-button>
    </section>
  </div>
</template>

<style lang="less" scoped>
// .search-box {
//   --van-calendar-popup-height: 100%;
// }

.location {
  .city {
    flex: 1;
    color: #ff9854;
    font-size: 16px;
    font-weight: 600;
  }

  .position {
    display: flex;
    align-items: center;
    
    .text {
      position: relative;
      top: 1px;
      color: #666;
      font-size: 12px;
      padding-left: 5px;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 2px 20px;
  color: #999;
  height: 44px;

  .start {
    display: flex;
    align-items: center;
  }

}
.date-range {
  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.hot-suggests {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: #333;
  height: 100%;

  .item {
    height: 22px;
    line-height: 22px;
    padding: 0 8px;
    margin: 8px 8px 0 0;
    border-radius: 14px;
    font-size: 12px;
    background-color: #f5f5f5;
  }
}

.searchBtn{
  margin: 10px 0;
  --van-button-normal-font-size:18px;
  --van-button-default-background-color:var(--theme-linear-gradient);
  --van-button-default-color:#fff;
}

</style>
