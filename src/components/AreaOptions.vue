<script setup lang="ts">
import type PrefectureData from '@/types/PrefectureData';

defineProps<{
  areaData?: PrefectureData[];
}>();
const emits = defineEmits<{
  handleChecked: [area: PrefectureData];
  handleUnchecked: [area: PrefectureData];
}>();

const updateAreasChecked = (event: Event, area: PrefectureData) => {
  const el = event.target as HTMLInputElement;
  if (el.checked) {
    // if checked interaction, add area
    emits('handleChecked', area);
  } else {
    // if unchecked, delete area
    emits('handleUnchecked', area);
  }
};
</script>

<template>
  <div class="section">
    <h1>都道府県</h1>
    <div class="area-container">
      <label class="area-box" v-for="a in areaData" :key="a.prefCode" :for="a.prefName">
        <input
          type="checkbox"
          :id="a.prefName"
          :value="a.prefCode"
          @click="updateAreasChecked($event, a)"
        />
        {{ a.prefName }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.area-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
