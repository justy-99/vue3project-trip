<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 右侧索引列表
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("#")
  return list
})

// 选中城市
const cityStore = useCityStore()
const router = useRouter()
const cityClick = (city) => {
  cityStore.currentCity = city
  router.back()
}
</script>

<template>
  <div class="city-group">
    <van-index-bar 
    :sticky="false"
    :index-list="indexList"
    >
      <van-index-anchor index="#">热门</van-index-anchor>
      <div class="hotList">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{city.cityName}}</div>
        </template>
        <!-- flex布局填充 -->
        <i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i>
      </div>
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city,index) in group.cities" :key="index">
          <van-cell :title="city.cityName" @click="cityClick(city)"/>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>


<style lang="less" scoped>
.hotList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
  i {
    width:70px;
  }
}
</style>
