import { ProjectConfig } from "@/types/config"
import setting from "./projectSetting"
import { deepMerge } from "@utils/index"
import { useAppStore } from "@store/modules/app"

export const initAppConfig = () => {
  const appStore = useAppStore()
  let projCfg: ProjectConfig = appStore.getProjectConfig
  projCfg = deepMerge(setting, projCfg || {})

  appStore.setProjectConfig(projCfg)
}
