import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 关闭控制台警告（浏览器Passive Event Listeners新特性）(20220806:会引起滑动时error报错问题)
// import 'default-passive-events'

// CSS重置
import "normalize.css"
import "./assets/css/index.css"

createApp(App).use(router).use(pinia).mount('#app')