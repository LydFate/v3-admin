<template>
  <a-drawer
    v-if="getMenuHidden"
    placement="left"
    :visible="!getCollapsed"
    :width="getMenuWidth"
    :getContainer="null"
    :closable="false"
    class="layout-drawer-wrapper"
    @close="handleClose"
  >
    <LayoutSider />
  </a-drawer>
  <LayoutSider v-else />
</template>

<script setup lang="ts">
import { useMenuSetting } from "@hooks/setting/useMenuSetting"
import LayoutSider from "./LayoutSider.vue"

const { getMenuHidden, getCollapsed, getMenuWidth, setMenuSetting } =
  useMenuSetting()

const handleClose = () => {
  setMenuSetting({
    collapsed: true,
  })
}
</script>

<style lang="less" scoped>
:deep(.layout-drawer-wrapper) {
  .ant-drawer-body {
    padding: 0;
  }
}
</style>
