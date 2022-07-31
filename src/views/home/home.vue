<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue';
import useHomeStore from '@/stores/modules/home'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()

</script>

<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
  </div>
</template>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}

</style>
