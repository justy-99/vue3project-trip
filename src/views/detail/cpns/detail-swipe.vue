<script setup>
import { ref } from 'vue';
const props = defineProps({
  swipeData: {
    type: Array,
    default:() => []
  }
})
// 数据格式{
// "title": "【卧室】：",
// "url": "https://pic.tujia.com/upload/cunit/day_210830/thumb/202108300327083642_700_467.jpg",
// "albumUrl": "https://pic.tujia.com/upload/cunit/day_210830/thumb/202108300327083642_1100_733.jpg",
// "orderIndex": 5,
// "pictureExplain": "雅致大床房",
// "enumPictureCategory": 2
// },

const swipeGroup = {}
// 对数据分类
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if(!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
// 截取分类标题
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const results = nameReg.exec(name)
  return results[1]
}
// 获取当前图片在自己分类中的索引
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex( data => data === item) + 1
}

// 获取swipe实例，跳转至点击类别的首个图片
const swipe = ref()
const indicatorClick = (value) => {
  const index = props.swipeData.findIndex(data => data == value[0] )
  swipe.value.swipeTo(index)
}

</script>

<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="4000" lazy-render ref="swipe">
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
          <div class="indicator">
            <template v-for="(value, key) in swipeGroup" :key="key">
              <span 
                class="item"
                :class="{ active: swipeData[active]?.enumPictureCategory == key }"
                @click="indicatorClick(value)"
              >
                <span class="text">{{ getName(value[0].title) }}</span>
                <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                  ({{ getCategoryIndex(swipeData[active]) }}/{{ value.length }})
                </span>
              </span>
            </template>
          </div>
      </template>
    </van-swipe>
  </div>
</template>


<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 4px;
      bottom: 4px;
      display: flex;
      padding: 2px 4px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.6);
      
      .item {
        padding: 0 4px;
        margin: 0 2px;
      }
      .active {
        border-radius: 4px;
        color: #333;
        background-color: #fff;
      }
    }
  }
}
</style>
