import laodJs from './dynamic_load_js'
// 腾讯位置服务
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()

const qqmapapi = 'https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js'
const KEY = '2IVBZ-XMMLW-IT3RI-OWPFQ-DFUEK-NQBEO'
const APPNAME = '地图学习'

const getLoaction = () => {
  return new Promise((resolve, reject) => {
    if(window.qq) {
      const qqgeolocation = new qq.maps.Geolocation(KEY, APPNAME);
      resolve(qqgeolocation)
    } else {
      mainStore.isLoading = true
      laodJs(qqmapapi).then(function () {
        mainStore.isLoading = false
        const qqgeolocation = new qq.maps.Geolocation(KEY, APPNAME);
        resolve(qqgeolocation)
      }).catch((err) => {
        mainStore.isLoading = false
        reject(err)
      })
    }
  })
}

export default getLoaction