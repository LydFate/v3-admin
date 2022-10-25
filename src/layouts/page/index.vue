<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition>
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
const openCache = computed(() => false)

const getCaches = computed((): string[] => {
  return []
})
</script>

<style lang="less" scoped></style>
