<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useCityStore from '@/stores/modules/city';
import cityGroup from './cpns/city-group.vue';


const router = useRouter()

// 搜索框
const searchValue = ref('')
const onCancel = () => {
  router.back()
}

// tab切换
const tabActive = ref()
// 从store获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()

const { allCities } = storeToRefs(cityStore)

</script>

<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/关键词"
        shape="round"
        show-action
        @cancel="onCancel"
      />

    </div>
    <div class="content">
      <van-tabs 
        v-model:active="tabActive" 
        color="#ff9854"
        line-height="3"
      >
        <template v-for="(value,key,index) in allCities" :key="index">
          <van-tab 
            :title="value.title" 
            :name="key">
            <city-group 
              :group-data="value"
              v-show="tabActive === key"
            ></city-group>
          </van-tab>
        </template>
      </van-tabs>
    </div>
  </div>
</template>


<style lang="less" scoped>

.city{
  :deep(.city-group) {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
