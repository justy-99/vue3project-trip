<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL } from '@/utils/load_assets'

const route = useRoute()
const active = computed(() => {
  return tabbarData.findIndex((item) => route.path.includes(item.path))
})


</script>

<template>
  <div class="tab-bar">
    <van-tabbar route v-model="active" active-color="#ff9854">
      <template v-for="(item,index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #icon>
            <img v-if="active === index" :src="getAssetURL(item.avtiveImg)" alt="">
            <img v-else :src="getAssetURL(item.img)"  alt="">
          </template>
          <template #default>
            {{item.title}}
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>


<style lang="less" scoped>
.tab-bar {
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 50px;
  // }

  img {
    height: 26px;
  }
}
</style>
