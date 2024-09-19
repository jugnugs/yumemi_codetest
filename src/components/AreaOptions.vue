<script setup lang="ts">
import type PrefectureData from '@/types/PrefectureData';

defineProps<{
  areaData?: PrefectureData[];
}>();
const areasChecked = defineModel<PrefectureData[]>();

const updateAreasChecked = (event: Event, area: PrefectureData) => {
  const el = event.target as HTMLInputElement;
  if (el.checked) {
    areasChecked.value?.push(area);
  }
  else {
    areasChecked.value = areasChecked.value?.filter(a => a.prefCode !== area.prefCode);
  }
};

</script>

<template>
  <div class="section area-container">
    <label class="area-box" v-for="a in areaData" :key="a.prefCode" :for="a.prefName">
      <input type="checkbox" :id="a.prefName" :value="a.prefCode" @click="updateAreasChecked($event, a)"  />
      {{ a.prefName }}
    </label>
  </div>
</template>

<style scoped>
.area-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
