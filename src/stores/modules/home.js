import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/service/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore('homeStore',{
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: '1',
    houselist:[]
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