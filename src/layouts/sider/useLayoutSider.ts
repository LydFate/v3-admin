import { useAppStore } from "@/store/modules/app"
import { useMenuSetting } from "@hooks/setting/useMenuSetting"

export const useSiderEvent = () => {
  const appStore = useAppStore()
  const { getMiniWidth } = useMenuSetting()
  const getCollapsedWidth = computed(() => {
    return unref(getMiniWidth)
  })
  // sider 触发断点
  const onBreakpointChange = (broken: boolean) => {
    appStore.setProjectConfig({
      menuSetting: {
        siderHidden: broken,
      },
    })
  }

  return { getCollapsedWidth, onBreakpointChange }
}
