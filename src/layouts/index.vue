<template>
  <a-layout class="jw-default-layout">
    <Sider></Sider>
    <a-layout>
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sider from "./sider/index.vue"
import Header from "./header/index.vue"
import Content from "./content/index.vue"
</script>

<style lang="less" scoped>
.jw-default-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: @content-bg;
  flex-direction: row;

  > .ant-layout {
    min-height: 100%;
  }

  &-main {
    width: 100%;
    margin-left: 1px;
  }
}
</style>
