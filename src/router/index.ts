import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
import { basicRoutes } from "./routes"

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
console.log(router.getRoutes())
// 配置路由
export function setupRouter(app: App<Element>) {
  app.use(router)
}
