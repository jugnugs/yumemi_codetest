<script setup lang="ts">
const model = defineModel();
const menuOptions = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

const handleClick = (newSelectedOption : string) => {
 if (newSelectedOption === model.value) {
  return;
 }
 else {
  model.value = newSelectedOption;
 }
}

</script>

<template>
  <div class="section">
    <div class="menu-container">
      <label class="menu-box" v-for="(option, i) in menuOptions" :key="i">
        <input type="radio" name="menu" :checked="option === modelValue" @click="handleClick(option)" />{{ option }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(0.5rem, 0.5rem + 1vw, 2.5rem);
}
</style>
