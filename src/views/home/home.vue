<script setup>
import { watch, computed } from 'vue';
// components
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/search-bar.vue'
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

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 480
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
    <div class="search-bar" v-if="isShowSearchBar">
      <searchBar></searchBar>
    </div>
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
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 10px 13px 10px;
  background-color: #fff;
}

</style>
