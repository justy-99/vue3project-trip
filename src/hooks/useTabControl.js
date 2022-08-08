import { ref, computed, watch } from 'vue';

import useScroll from '@/hooks/useScroll'

export default function useTabControl () {
  // tabControl相关的操作
  const pageRef = ref()
  const { scrollTop,isEndScroll } = useScroll(pageRef)

  // 存放各个组件映射
  const sectionEls = ref({})
  const names = computed(() => {
    return Object.keys(sectionEls.value)
  })
  //每个组件的offsetTop
  const topValues = ref([])
  // 为sectionEls赋值 （函数模板引用 挂载和卸载都会执行）
  const getSectionRef = (value) => {
    if (!value) return
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
  }
  let isClick = false //记录处于点击滚动状态
  const tabControlRef = ref()  //tabControl引用
  const tabControlHeight = ref()  //tabControl的DOM元素高度
  // 点击顶部item，滑动到对应高度  5是section上边框高度
  const tabClick = (index) => {
    // 先匹配对应组件
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    // 计算需要滚动至什么位置
    let distance = el.offsetTop - tabControlHeight.value + 5
    //记录处于点击状态，设置选中样式
    isClick = true
    tabControlRef.value?.setCurrentIndex(index)
    //滚动至点击位置
    pageRef.value.scrollTo({
      top: distance,
      behavior: "smooth"
    })
  }
  // 监听是否滚动结束，重置isClick状态
  watch(isEndScroll, (newValue) => {
    if(newValue) {
      isClick = false
      scrollTop.value = pageRef.value?.scrollTop
      findCurrent(scrollTop.value)
      isEndScroll.value = false
    }
  })
  // 是否展示tabcontrol
  const showTabControl = ref(false)
  // 监听页面滚动, 滚动时匹配对应的tabControl的index
  watch(scrollTop, (newValue) => {
    // 点击触发滚动则不匹配
    if(isClick) return
    // 1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    topValues.value = els.map(el => el.offsetTop)
    // 动态获取tabControl的DOM元素高度
    tabControlHeight.value = tabControlRef.value?.$el.clientHeight
    // 是否展示tabcontrol
    if (newValue >= topValues.value[0] - tabControlHeight.value) {
      showTabControl.value = true
    } else {
      showTabControl.value = false
    }
    findCurrent(newValue)
  })
  // 设置选中tab样式
  const findCurrent = (newValue) => {
    let index = topValues.value.length - 1
    for (let i = 0; i < topValues.value.length; i++) {
      if (topValues.value[i] > newValue + tabControlHeight.value) {
        index = i - 1
        break
      }
    } 
    tabControlRef.value?.setCurrentIndex(index)
    
    // // 思路二：根据newValue去匹配想要索引
    // let index = 0
    // // 从前往后查找，newval需要小于目标item的最底部，
    // // 匹配到的都是选中的往后一项，需要索引减一
    // index = values.findIndex( item => newValue <= (item - 44)) - 1
    // //最后一项没有后一项，会未匹配到，就是 -1 -1为-2
    // if(index === -2) index = values.length-1 
    // //第一项默认选中
    // if(index < 0) index = 0   
    // tabControlRef.value?.setCurrentIndex(index)
  }
  return { pageRef, tabControlRef, showTabControl, names, tabClick, getSectionRef }
}