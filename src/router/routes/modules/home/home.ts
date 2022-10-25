import type { AppRouteModule } from "@/router/types"

import { LAYOUT } from "@/router/constant"

const dashboard: AppRouteModule = {
  path: "/home",
  name: "Home",
  component: LAYOUT,
  redirect: "/home/index",
  meta: {
    icon: "simple-icons:about-dot-me",
    title: "cs",
  },
  children: [
    {
      path: "index",
      name: "HomePage",
      component: () => import("@views/home/index.vue"),
      meta: {
        title: "cs",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
}

export default dashboard
