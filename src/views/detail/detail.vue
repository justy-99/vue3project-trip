<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// components
import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
// hook
import useScroll from '@/hooks/useScroll'
// service
import { getDetailInfos } from '@/service/modules/detail.js';

const router = useRouter()
const route = useRoute()
// 左上角退回按钮
const onClickLeft = () => {
  router.back()
}
// 根据houseId获取数据
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart )
getDetailInfos({ houseId }).then((res) => {
  detailInfos.value = res.data  
})

// tabControl相关的操作
const detailRef = ref()
const { scrollTop,isEndScroll } = useScroll(detailRef)
// 展示tabcontrol  tabcontrol和navbar的高度差为2(当前)
const showTabControl = computed(() => {
  return scrollTop.value >= topValues.value[0] - 44
})
// 存放各个组件映射
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const topValues = ref([])  //每个组件的offsetTop
// 为sectionEls赋值 （函数模板引用 挂载和卸载都会执行）
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
let isClick = false //记录处于点击滚动状态
const tabControlRef = ref()
// 点击顶部item，滑动到对应高度  44是tabcontrol的高度 5是上边框高度
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop - 44 + 5
  
  isClick = true
  tabControlRef.value?.setCurrentIndex(index)

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}
// 滚动结束重置isClick状态
watch(isEndScroll, (newValue) => {
  if(newValue) {
    isClick = false
    scrollTop.value = detailRef.value?.scrollTop
    findCurrent(scrollTop.value)
    isEndScroll.value = false
  }
})
// 页面滚动, 滚动时匹配对应的tabControl的index
watch(scrollTop, (newValue) => {
  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  topValues.value = els.map(el => el.offsetTop)
  // 点击触发滚动则不匹配
  if(isClick) return
  findCurrent(newValue)
})
// 设置选中tab
const findCurrent = (newValue) => {
  let index = topValues.value.length - 1
  for (let i = 0; i < topValues.value.length; i++) {
    if (topValues.value[i] > newValue + 44) {
      index = i - 1
      break
    }
  } 
  tabControlRef.value?.setCurrentIndex(index)
  
  // // 思路二：根据newValue去匹配想要索引
  // let index = 0
  // // 从前往后查找，newval需要小于目标item的最底部，
  // // 匹配到的都是选中的往后一项，需要索引减一
  // index = values.findIndex( item => newValue <= (item - 44)) - 1
  // //最后一项没有后一项，会未匹配到，就是 -1 -1为-2
  // if(index === -2) index = values.length-1 
  // //第一项默认选中
  // if(index < 0) index = 0   
  // tabControlRef.value?.setCurrentIndex(index)
}

</script>

<template>
  <div class="top-page detail" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
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
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">无忧旅途, 永无止境!</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// .detail {
  // --van-nav-bar-text-color: var(--primary-color);
  // --van-nav-bar-icon-color: var(--primary-color);
// }
.tabs{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
}
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
