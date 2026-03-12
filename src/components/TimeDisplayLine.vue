<template>
  <div class="time-display-line">
    <TimeDisplay :time="line.value" />
  </div>
</template>

<script setup lang="ts">
import type { TimeDisplayLineV2 } from "@/types";
import TimeDisplay from "./TimeDisplay.vue";

defineProps<{
  line: TimeDisplayLineV2;
  index: number;
}>();
</script>

<style scoped>
.time-display-line {
  margin-top: 24px;
  margin-bottom: 20px;
}
</style>

