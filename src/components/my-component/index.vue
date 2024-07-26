<script setup lang="ts">
import { ref } from 'vue'

const a = ref(1)
const add = () => {
  a.value++
}
</script>

<template>
  <!--这是一个组件-->
  <div class="title">这是一个组件 {{a}}</div>
  <button @click="add">btn</button>
</template>

<style scoped lang="scss">
.title{
  font-size: 22px;
  color: beige;
}
</style>
