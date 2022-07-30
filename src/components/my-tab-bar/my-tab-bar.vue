<script setup>
import tabBarItem from "./tab-bar-item.vue"
import tabbarData from "@/assets/data/tabbar.js"
</script>

<template>
  <div class="tab-bar">
    <template v-for="item in tabbarData">
      <tab-bar-item :item-data="item"></tab-bar-item>
    </template>
  </div>
</template>


<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  border-top: 1px solid #f3f3f3;
}
</style>
