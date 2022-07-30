<script setup>
  import tabBar from "@/components/van-tab-bar/tab-bar.vue"

</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
              <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
              />
        </keep-alive>
      </transition>
    </router-view>
    <tab-bar/>
  </div>
</template>

<style scoped lang="less">

</style>
