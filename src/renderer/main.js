import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import App from './App.vue'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const sysLang = navigator.language || navigator.userLanguage || 'zh-CN'
let elementLocale = zhCn
if (sysLang === 'en' || sysLang.startsWith('en-')) {
  elementLocale = en
} else if (sysLang === 'lzh' || sysLang === 'zh-classical') {
  elementLocale = zhCn
}

app.use(ElementPlus, { locale: elementLocale })
app.mount('#app')

window.addEventListener('DOMContentLoaded', () => {
  if (window.electronAPI && window.electronAPI.theme) {
    window.electronAPI.theme.onThemeChange((theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  }
})