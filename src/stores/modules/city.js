import { defineStore } from 'pinia'
import { getCityAll } from '@/service/modules/city';

const useCityStore = defineStore('cityStore', {
  state: () => ({
    allCities:{},
    currentCity: {
      cityName: '广州'
    }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

 export default useCityStore