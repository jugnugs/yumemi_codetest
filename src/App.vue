<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AreaOptions from './components/AreaOptions.vue';
import GraphComponent from './components/GraphComponent.vue';
import MenuOptions from './components/MenuOptions.vue';
import axios from 'axios';
import type PrefectureData from './types/PrefectureData';
import type { GraphResponseData, GraphData } from './types/GraphData';

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const api_key = import.meta.env.VITE_API_KEY;

const prefectureOptions = ref<PrefectureData[]>([]);
const selectedMenuOption = ref<string>('総人口');
const graphData = ref<GraphData[]>([]);

const fetchAllPrefectures = async () => {
  await axios
    .get(endpoint + '/prefectures', {
      headers: {
        'X-API-KEY': api_key
      }
    })
    .then((res) => {
      const data: PrefectureData[] = res.data.result;
      prefectureOptions.value = data;
    })
    .catch((err) => console.log(err));
};

const fetchPopulationDataForArea = async (area: PrefectureData) => {
  let graphDataForArea: GraphData | null = null;
  await axios
    .get(endpoint + `/population/composition/perYear?cityCode=-&prefCode=${area.prefCode}`, {
      headers: {
        'X-API-KEY': api_key
      }
    })
    .then((res) => {
      const data: GraphResponseData[] = res.data.result.data;
      // get total population data
      graphDataForArea = {
        name: area.prefName,
        data: data[0].data.map((d) => d.value)
      };
      return graphDataForArea;
    })
    .catch((err) => console.log(err));
  return graphDataForArea;
};

onMounted(() => {
  fetchAllPrefectures();
});

const addGraphData = async (areaToAdd: PrefectureData) => {
  const newGraphData = await fetchPopulationDataForArea(areaToAdd);
  if (newGraphData) {
    graphData.value.push(newGraphData);
  }
};

const deleteGraphData = async (areaToDelete: PrefectureData) => {
  graphData.value = graphData.value.filter(item => item.name !== areaToDelete.prefName);
};
</script>

<template>
  <div class="title">都道府県別の総人口推移</div>
  <div class="container">
    <AreaOptions :area-data="prefectureOptions" @handle-checked="addGraphData" @handle-unchecked="deleteGraphData" />
    <MenuOptions v-model="selectedMenuOption" />
    <GraphComponent :graph-data="graphData" />
  </div>
</template>

<style scoped>
.title {
  position: sticky;
  top: 0;
  font-size: 2.5rem;
  font-weight: 700;
}
</style>
