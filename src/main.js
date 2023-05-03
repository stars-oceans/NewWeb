// 导入 element plus
import ElementPlus from 'element-plus'
// 导入element plus 的 css
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
