<template>
  <div @click.stop="toggleCollapsed">
    <menu-unfold-outlined v-if="getCollapsed" />
    <menu-fold-outlined v-else />
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue"

const getCollapsed = ref(false)

const toggleCollapsed = () => {
  getCollapsed.value = !getCollapsed.value
}
</script>

<style lang="less" scoped></style>
