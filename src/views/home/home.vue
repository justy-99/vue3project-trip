<script setup>
import { watch } from 'vue';
// components
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue'
// hook
import useScroll from '@/hooks/useScroll';
// store
import useHomeStore from '@/stores/modules/home'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()


const { isReachBottom, scrollTop } = useScroll()

watch( isReachBottom, (newValue) => {
  if(newValue) {
    // 到达底部后请求新数据并且重置标识
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})



</script>

<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}

</style>
