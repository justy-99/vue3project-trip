import { getHomeHotSuggests,getHomeCategories } from "@/service/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore('homeStore',{
  state: () => ({
    hotSuggests: [],
    categories: [],

  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    }
  }
})

export default useHomeStore