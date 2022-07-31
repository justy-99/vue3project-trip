import laodJs from './dynamic_load_js'
// 腾讯位置服务
const qqmapapi = 'https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js'
const KEY = '2IVBZ-XMMLW-IT3RI-OWPFQ-DFUEK-NQBEO'
const APPNAME = '地图学习'

const getLoaction = () => {
  return new Promise((resolve, reject) => {
    if(!window.qq) {
      laodJs(qqmapapi).then(function () {
        const qqgeolocation = new qq.maps.Geolocation(KEY, APPNAME);
        resolve(qqgeolocation)
      }).catch((err) => {
        reject(err)
      })
    } else {
      const qqgeolocation = new qq.maps.Geolocation(KEY, APPNAME);
      resolve(qqgeolocation)
    }
  })
}

export default getLoaction