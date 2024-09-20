<script setup lang="ts">
const menuOptions = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
</script>

<template>
  <div class="section">
    <div class="menu-container">
      <label class="menu-box" v-for="(option, i) in menuOptions" :key="i">
        <input type="radio" name="menu" />{{ option }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
}
</style>
