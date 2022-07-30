<script setup>
import { computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  itemData: {
    type: Object,
    default: ()=>({})
  }
})
// 当前item是否处于激活状态
let activated = computed(() => route.path.indexOf(props.itemData.path) !== -1)
// 点击切换路由 
const clickTab = (path) => router.push(path)
</script>

<template>
  <div class="tab-bar-item" @click="clickTab(itemData.path)">
    <img v-if="activated" :src="getAssetURL(itemData.avtiveImg)" alt="">
    <img v-else :src="getAssetURL(itemData.img)" alt="">
    <span :class="{active : activated}" class="text">{{itemData.title}}</span>
  </div>
</template>


<style lang="less" scoped>
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    
    img {
      width: 36px;
      height: 28px;
    }
    & .text{
      margin-top: 2px;
      font-size: 12px;
    }

    & .active {
      color: #f33;
    }

  }

</style>
