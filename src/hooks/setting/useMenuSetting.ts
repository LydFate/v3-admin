import { MenuSetting } from "@/types/config"
import { computed, unref, ref } from "vue"

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from "@enums/appEnum"
import { useAppStore } from "@store/modules/app"

export const useMenuSetting = () => {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getMenuHidden = computed(() => appStore.getMenuSetting.siderHidden)

  const getMiniWidth = computed(() => {
    const { collapsedShowTitle, siderHidden } = appStore.getMenuSetting
    return siderHidden
      ? 0
      : collapsedShowTitle
      ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
      : SIDE_BAR_MINI_WIDTH
  })

  const setMenuSetting = (menuSetting: Partial<MenuSetting>) => {
    appStore.setProjectConfig({ menuSetting })
  }

  const toggleCollapsed = () => {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    getMenuHidden,
    getCollapsed,
    getMenuWidth,
    getMiniWidth,
    setMenuSetting,
    toggleCollapsed,
  }
}
