<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue'

import useHomeStore from '@/stores/modules/home'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

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
