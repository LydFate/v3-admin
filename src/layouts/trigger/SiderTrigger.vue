<template>
  <div class="trigger" @click.stop="toggleCollapsed">
    <menu-unfold-outlined style="font-size: 16px" v-if="getCollapsed" />
    <menu-fold-outlined style="font-size: 16px" v-else />
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue"
import { useMenuSetting } from "@hooks/setting/useMenuSetting"

const { getCollapsed, toggleCollapsed } = useMenuSetting()
</script>

<style lang="less" scoped>
.trigger {
  width: 40px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: @content-bg;
  }
}
</style>
