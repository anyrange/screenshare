<script lang="ts" setup>
  import { useDark } from "@vueuse/core";

  useDark();
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
