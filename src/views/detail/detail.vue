<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// components
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"

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

      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />

      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>

      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>

      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>

      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>

      <detail-intro :price-intro="mainPart.introductionModule"/>

      <div class="footer">
        <img src="@/assets/img/detail/icon_ensure.png" alt="">
        <div class="text">无忧旅途, 永无止境!</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// .detail {
  // --van-nav-bar-text-color: var(--primary-color);
  // --van-nav-bar-icon-color: var(--primary-color);
// }

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
