<script setup>
import tabBar from "@/components/van-tab-bar/tab-bar.vue"
import { useRoute } from "vue-router";
import Loading from "@/components/loading/loading.vue";

const route = useRoute()

</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component, route }">
      <keep-alive include="home">
        <component
          :is="Component"
        />
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"/>
    <loading/>
  </div>
</template>

<style scoped lang="less">

</style>
