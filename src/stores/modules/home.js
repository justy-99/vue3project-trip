import { getHomeHotSuggests } from "@/service/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore('homeStore',{
  state: () => ({
    hotSuggests: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore