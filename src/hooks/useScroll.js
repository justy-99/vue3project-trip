import { _debounce, _throttle } from '@/utils/tools'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

export default function useScroll(elRef, time = 50) {
  let el = window

  const isReachBottom = ref(false)
  const isEndScroll = ref(true)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = _throttle(() => {
    isEndScroll.value = false
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    
    if (clientHeight.value * 1.1 + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, time)

  const scrollEndListene = _debounce(() => {
    isEndScroll.value = true
  }, 50)
  
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
    el.addEventListener("scroll", scrollEndListene)
  })

  onActivated(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
    el.addEventListener("scroll", scrollEndListene)
  })

  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
    el.removeEventListener("scroll", scrollEndListene)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
    el.removeEventListener("scroll", scrollEndListene)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight, isEndScroll }
}