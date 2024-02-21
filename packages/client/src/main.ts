import './assets/main.css'
import 'animate.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import { StyleProvider, Themes } from '@varlet/ui'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Varlet)
//注入MD3亮色主题
StyleProvider(Themes.md3Light)
app.config.errorHandler = (err) => {
    alert(err)
    console.log(err)
}

app.mount('#app')
