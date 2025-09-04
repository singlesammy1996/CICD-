import { createI18n } from "vue-i18n";
import zhCN from "./locales/zh-CN.ts";
import enUS from "./locales/en-US.ts";

let language = localStorage.getItem("language") || navigator.language; //  获取本地存储 || 根据浏览器语言设置

const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  locale: language, // 默认显示语言 
  // globalInjection: true, // 全局注册$t方法
  messages: { // 配置语言对应的文件
    "zh-CN": zhCN,
    "en-US": enUS,
  },
});

export default i18n;
