<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AreaOptions from './components/AreaOptions.vue';
import GraphComponent from './components/GraphComponent.vue';
import MenuOptions from './components/MenuOptions.vue';
import axios from 'axios';
import type PrefectureData from './types/PrefectureData';
import type { GraphResponseData, GraphData, AggregateGraphData } from './types/GraphData';

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const api_key = import.meta.env.VITE_API_KEY;

const prefectureOptions = ref<PrefectureData[]>([]);
const selectedMenuOption = ref<string>('総人口');
const graphData = ref<AggregateGraphData>({
  "総人口": [],
  "年少人口": [],
  "生産年齢人口": [],
  "老年人口": []
});
const selectedGraphData = computed(() => {
  return graphData.value[selectedMenuOption.value];
});

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
  await axios
    .get(endpoint + `/population/composition/perYear?cityCode=-&prefCode=${area.prefCode}`, {
      headers: {
        'X-API-KEY': api_key
      }
    })
    .then((res) => {
      const data: GraphResponseData[] = res.data.result.data;
      // get population data for all types
      data.map((item, index) => {
        const label = item.label;
        const graphDataPiece: GraphData = {
          name: area.prefName,
          data: data[index].data.map((d) => d.value)
        };
        graphData.value[label].push(graphDataPiece);
      });
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  fetchAllPrefectures();
});

const addGraphData = async (areaToAdd: PrefectureData) => {
  await fetchPopulationDataForArea(areaToAdd);
};

const deleteGraphData = async (areaToDelete: PrefectureData) => {
  Object.keys(graphData.value).forEach(key => {
    graphData.value[key] = graphData.value[key].filter((item) => item.name !== areaToDelete.prefName);
  });
};
</script>

<template>
  <div class="title">都道府県別の総人口推移</div>
  <div class="container">
    <AreaOptions
      :area-data="prefectureOptions"
      @handle-checked="addGraphData"
      @handle-unchecked="deleteGraphData"
    />
    <MenuOptions v-model="selectedMenuOption" />
    <GraphComponent :graph-data="selectedGraphData" />
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
