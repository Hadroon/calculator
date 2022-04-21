<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Calculator />
</template>

<script>
import Calculator from './components/calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator,
  }
}
</script>

<style>
  @import './styles/main.css';
</style>
