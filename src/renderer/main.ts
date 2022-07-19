import { createApp } from 'vue'

import './styles/index.scss'
import './permission'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'
import store from './store'

import { i18n } from "./i18n"

import TitleBar from "./components/common/TitleBar.vue"
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
errorHandler(app)

// 全局引入 TitleBar 组件
app.component("TitleBar", TitleBar);

app.mount("#app")

