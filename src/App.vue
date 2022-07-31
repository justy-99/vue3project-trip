<script setup>
import tabBar from "@/components/van-tab-bar/tab-bar.vue"
import { useRoute } from "vue-router";

const route = useRoute()

</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </keep-alive>
    </router-view>
    <tab-bar v-if="!route.meta.hideTabBar"/>
  </div>
</template>

<style scoped lang="less">

</style>
