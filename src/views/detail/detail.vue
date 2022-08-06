<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import detailSwipe from './cpns/detail-swipe.vue'
import { getDetailInfos } from '@/service/modules/detail.js';

const router = useRouter()
const route = useRoute()
// 左上角退回按钮
const onClickLeft = () => {
  router.back()
}

const houseId = route.params.id

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart )
getDetailInfos({ houseId }).then((res) => {
  detailInfos.value = res.data  
})


</script>

<template>
  <div class="top-page detail">
    <van-nav-bar 
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    </div>
  </div>
</template>

<style lang="less" scoped>
// .detail {
  // --van-nav-bar-text-color: var(--primary-color);
  // --van-nav-bar-icon-color: var(--primary-color);
// }
</style>
