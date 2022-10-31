import { defineStore } from "pinia"
import { store } from "@/store"
import { deepMerge } from "@utils/index"

import { ProjectConfig, HeaderSetting, MenuSetting } from "@/types/config"

interface AppState {
  pageLoading: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: null,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
  },
  // 开启数据缓存
  persist: true,
})
