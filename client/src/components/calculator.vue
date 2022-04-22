<template>
  <div class="main-wrapper">
    <div class="display">
    </div>
    <div class="container">
      <div class="button">MC</div>
      <div class="button">MR</div>
      <div class="button">M-</div>
      <div class="button">M+</div>
      <div class="button">7</div>
      <div class="button">8</div>
      <div class="button">9</div>
      <div class="button">÷</div>
      <div class="button">4</div>
      <div class="button">5</div>
      <div class="button">6</div>
      <div class="button">*</div>
      <div class="button">1</div>
      <div class="button">2</div>
      <div class="button">3</div>
      <div class="button">-</div>
      <div class="button">00</div>
      <div class="button">0</div>
      <div class="button">.</div>
      <div class="button">+</div>
      <div class="button clear-button">C</div>
      <div class="button equal-button">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator-comp',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
