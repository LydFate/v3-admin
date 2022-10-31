<template>
  <a-layout-header>
    <!-- left start -->
    <div class="layout-header">
      <Trigger />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import Trigger from "../trigger/index.vue"
</script>

<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  height: @header-height;
  padding: 0;
  margin-left: -1px;
  line-height: @header-height;
  background-color: @white;
  align-items: center;
  justify-content: space-between;
}
.layout-header {
  background-color: #fff;
}
</style>
