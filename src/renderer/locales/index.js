import { ref } from 'vue'
import zhCN from './zh-CN.js'
import enUS from './en-US.js'
import lzh from './lzh.js'

const locales = {
  'zh-CN': zhCN,
  'zh': zhCN,
  'en-US': enUS,
  'en': enUS,
  'lzh': lzh,
  'zh-classical': lzh
}

function getSystemLanguage() {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || navigator.userLanguage || 'zh-CN'
    if (lang === 'lzh' || lang === 'zh-classical') return 'lzh'
    if (lang.startsWith('zh')) return 'zh-CN'
    if (lang.startsWith('en')) return 'en-US'
    return 'zh-CN'
  }
  return 'zh-CN'
}

const currentLocale = ref(getSystemLanguage())

export function getLocale() {
  return locales[currentLocale.value] || locales['zh-CN']
}

export function setLocale(lang) {
  if (locales[lang]) {
    currentLocale.value = lang
  }
}

export function getCurrentLang() {
  return currentLocale.value
}

export function t(path) {
  const locale = getLocale()
  const keys = path.split('.')
  let result = locale
  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key]
    } else {
      return path
    }
  }
  return result
}

export { currentLocale }

export default { getLocale, setLocale, getCurrentLang, t }