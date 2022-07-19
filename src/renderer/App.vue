<template>
  <n-message-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </n-message-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
</script>

<style>
.n-message {
  margin-top: 30px !important;
}
</style>
