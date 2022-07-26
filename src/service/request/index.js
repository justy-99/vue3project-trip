import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class HttpRequest {
  constructor(baseURL, timeout=10000) {
    this.config = {
      baseURL,
      timeout
    }
  }

  interceptors(instance) {
    // 对实例配置拦截器
    instance.interceptors.request.use((config) => {
      mainStore.isLoading = true
      return config
    }, (err) => {
      return Promise.reject(err)
    })
    // 响应拦截
    instance.interceptors.response.use((response) => {
      mainStore.isLoading = false
      if (response.status === 200) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    },(err) => {
      mainStore.isLoading = false
      return Promise.reject(err.response)
    })
  }

  request(options) {
    const instance = axios.create()
    const newOptions = {...this.config, ...options}
    this.interceptors(instance)
    return instance.request(newOptions)
  }

  get(url, data, config) {
    const options = {
      method: 'get',
      url,
      params: data,
      ...config
    }
    return this.request(options)
  }

  post(url, data, config) {
    const options = {
      method: 'post',
      url,
      data,
      ...config
    }
    return this.request(options)
  }

  delete(url, data, config) {
    const options = {
      method: 'delete',
      url,
      data,
      ...config
    }
    return this.request(options)
  }

  patch(url, data, config) {
    const options = {
      method: 'patch',
      url,
      data,
      ...config
    }
    return this.request(options)
  }
}

export default new HttpRequest(BASE_URL,TIMEOUT)
