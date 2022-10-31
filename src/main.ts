import "./design/index.less"

import { createApp } from "vue"
import App from "./App.vue"
import { initAppConfig } from "@/settings/initConfig"
import { setupStore } from "@store/index"
import { setupRouter } from "@router/index"

const app = createApp(App)

// 配置 store
setupStore(app)

// 初始化设置
initAppConfig()

// 配置路由
setupRouter(app)

app.mount("#app")
