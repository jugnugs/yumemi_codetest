<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AreaOptions from './components/AreaOptions.vue';
import GraphComponent from './components/GraphComponent.vue';
import MenuOptions from './components/MenuOptions.vue';
import axios from 'axios';
import type PrefectureData from './types/PrefectureData';

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const api_key = import.meta.env.VITE_API_KEY;

const selectedPrefectures = ref<PrefectureData[]>([]);

const fetchAllPrefectures = async () => {
  await axios
    .get(endpoint + '/prefectures', {
      headers: {
        'X-API-KEY': api_key
      }
    })
    .then(res => {
      const data: PrefectureData[] = res.data.result;
      selectedPrefectures.value = data;
    })
    .catch(err => console.log(err));
}

onMounted(() => {
  fetchAllPrefectures();
});
</script>

<template>
  <div class="container">
    <p>frontend coding practice project</p>
    <AreaOptions />
    <MenuOptions />
    <GraphComponent />
  </div>
</template>

<style scoped></style>
