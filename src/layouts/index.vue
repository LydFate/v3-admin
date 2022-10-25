<template>
  <Layout>
    <a-layout-sider>Sider</a-layout-sider>
    <Layout>
      <Header />
      <Content />
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout } from "ant-design-vue"
import Header from "./header/index.vue"
import Content from "./content/index.vue"
</script>

<style lang="less" scoped></style>
