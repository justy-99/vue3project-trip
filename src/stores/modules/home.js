import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/service/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore('homeStore',{
  state: () => ({
    hotSuggests: [], //搜索建议
    categories: [], //分类

    currentPage: '1',
    houselist:[]  //首页房源列表
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouselistData() {
      const res = await getHomeHouselist({ page: this.currentPage })
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore