import laodJs from './loadJs'
// 腾讯位置服务
const qqmapapi = 'https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js'
const key = '2IVBZ-XMMLW-IT3RI-OWPFQ-DFUEK-NQBEO'
const appName = '地图学习'

const getLoaction = () => {
  return new Promise((resolve, reject) => {
    if(!window.qq) {
      laodJs(qqmapapi).then(() => {
        const qqgeolocation = new qq.maps.Geolocation(key, appName);
        resolve(qqgeolocation)
      }).catch((err) => {
        reject(err)
      })
    } else {
      const qqgeolocation = new qq.maps.Geolocation(key, appName);
      resolve(qqgeolocation)
    }
  })
}

export default getLoaction