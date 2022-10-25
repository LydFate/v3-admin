<template>
  <Layout.Header>
    <!-- left start -->
    <div class="layout-header">
      <Trigger />
    </div>
  </Layout.Header>
</template>

<script setup lang="ts">
import { Layout } from "ant-design-vue"
import Trigger from "../trigger/index.vue"
</script>

<style lang="less" scoped>
.layout-header {
  background-color: #fff;
}
</style>
