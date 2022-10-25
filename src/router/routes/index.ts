// import {} from '@router/routes/basic'
import type { AppRouteRecordRaw, AppRouteModule } from "@router/types"

import dashboard from "./modules/home/home"

import { PageEnum } from "@enums/pageEnum"

const modules = import.meta.glob("./modules/**/*.ts")

const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key: any) => {
  const mod = key.default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
console.log(routeModuleList)
// 异步路由
export const asyncRoutes = [...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
}

// 登录路由
export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@views/login/index.vue"),
  meta: {
    title: "登录",
  },
}

// 导出基本路由
export const basicRoutes = [RootRoute, LoginRoute, dashboard]
