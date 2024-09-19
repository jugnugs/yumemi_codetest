<script setup lang="ts">
import { computed } from 'vue';

const { graphData } = defineProps(['graphData']);

const chartOptions = computed(() => {
  return {
    title: {
      text: undefined
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    xAxis: {
      title: {
        text: '年度'
      },
      tickInterval: 5
    },
    series: graphData,
    plotOptions: {
      series: {
        pointStart: 1960,
        pointInterval: 5
      }
    },
    legend: {
      layout: 'proximate',
      align: 'right'
    }
  };
});
</script>

<template>
  <div class="section">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<style scoped></style>
