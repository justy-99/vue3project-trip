<!-- <script>
//如使用 <script setup> 需要通过 defineExpose({}) 宏显式暴露
  export default {
    props: {
      titles: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    emits: ["tabItemClick"],
    methods: {
      itemClick(index) {
        // this.currentIndex = index
        this.$emit("tabItemClick", index)
      },
      setCurrentIndex(index) {
        this.currentIndex = index
      }
    }
  }
</script> -->
<script setup>
import { ref } from 'vue'

defineProps({
  titles: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['tabItemClick'])

const currentIndex = ref(0)

const itemClick = (index) => {
  emits('tabItemClick',index)
}

const setCurrentIndex = (index) => {
  currentIndex.value = index
}

defineExpose({
  itemClick,
  setCurrentIndex
})
</script>

<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item"
           :class="{ active: index === currentIndex }"
           @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary-color);
    padding: 8px;
  }
</style>

