<template>
  <a-layout-sider
    ref="siderRef"
    breakpoint="lg"
    class="layout-sider-wrapper"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    :theme="'dark'"
    :trigger="null"
    @breakpoint="onBreakpointChange"
  >
    <div class="logo"></div>
    sider
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useMenuSetting } from "@hooks/setting/useMenuSetting"
import { useSiderEvent } from "./useLayoutSider"

const { getCollapsed, getMenuWidth } = useMenuSetting()
const { getCollapsedWidth, onBreakpointChange } = useSiderEvent()
</script>

<style lang="less" scoped>
.layout-sider-wrapper {
  height: 100vh;
}
.logo {
  height: 48px;
  background-color: black;
}
</style>
