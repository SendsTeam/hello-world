import './assets/main.css'
import 'animate.css'
import '@varlet/ui/es/style'

import { createApp } from 'vue'

//注入全局变量,供打包后的自定义卡片使用
import * as Vue from 'vue'
;(window as any).Vue = Vue

import App from './App.vue'
import router from './router'
import { pinia } from './stores'

import { StyleProvider, Themes } from '@varlet/ui'

const app = createApp(App)
app.use(pinia)
app.use(router)

//注入MD3亮色主题
StyleProvider(Themes.md3Light)
app.config.errorHandler = (err) => {
    alert(err)
    console.log(err)
}

app.mount('#app')
