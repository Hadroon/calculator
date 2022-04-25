<template>
  <div class="main-wrapper">
    <div class="calculator">
      <div class="display">
        <span class="numbers">{{numbersOnDisplay}}</span>
      </div>
      <div class="container">
        <div 
          v-for="button in buttons" :key="button.value"
          @click="handler(button.handler, button.value)"
          class="button"
        >
          {{button.sign || button.value}}
        </div>
      </div>
    </div>
    <div class="history">
      <div v-for="line in history" :key="line">
          {{line}}
      </div>
    </div>
  </div>
</template>

<script>
import buttons from '../utils/buttons'

export default {
  name: 'calculator-comp',
  // created() {
  //   console.log('ziggi')
  //   console.log(buttons)
  // },
  props: {
  },
  data() {
    return {
      buttons,
      numbersOnDisplay: '0',
      storedDisplayNumber: '0',
      operation: '',
      newNumber: true,
      lastInput: '',
      history: ['alma', 'csoki'],
    }
  },
  methods: {
    handler(fn, value) {
      this[fn](value)
    },
    handleValues(value) {
      if (Number(this.numbersOnDisplay) === 0 && (value === '0' || value === '00')) return
      this.lastInput = 'number'

      if (this.numbersOnDisplay === '0' && value !== '0') {
        this.newNumber = !this.newNumber
        return this.numbersOnDisplay = value
      }

      if (this.newNumber) {
        this.numbersOnDisplay = value
        this.newNumber = !this.newNumber
      } else {
        this.numbersOnDisplay += value
      }
    },
    doOperaion(value) {
      if (value === 'C') return this.reset()
      if (this.lastInput === 'operation') return this.operation = value

      this.newNumber = true

      if (this.storedDisplayNumber !== '0' && this.lastInput === 'number' && this.operation) {
        this.count(value)
      } else {
        this.storedDisplayNumber = this.numbersOnDisplay
      }

      (value === '=') ? this.operation = '' : this.operation = value
      this.lastInput = 'operation'
    },
    // handleDecimal(value) {
      // console.log('222', this.lastInput, this.lastInput === 'operation', (this.numbersOnDisplay === '0' || this.lastInput === 'operation'))
      // if (this.numbersOnDisplay.includes('.') && this.lastInput !== 'operation') return
      // this.lastInput = 'number'
      // if (this.numbersOnDisplay === '0' || this.lastInput === 'operation') {
      //   this.numbersOnDisplay = '0.'
      //   console.log('kjhkjhkjhkjh')
      //   return
      // }
      // console.log('IDE NEEEEE')
      // this.numbersOnDisplay += value
    // },
    doMemoryOperation() {
    },
    count() {
      // console.log('count start', this.storedDisplayNumber + this.operation + this.numbersOnDisplay)
      const result = eval(this.storedDisplayNumber + this.operation + this.numbersOnDisplay)
      const resultStr = String(result)
      this.storedDisplayNumber = resultStr
      this.numbersOnDisplay = resultStr
    },
    reset() {
      console.log('reset')
      this.operation = ''
      this.lastInput = ''
      this.storedDisplayNumber = '0'
      this.newNumber = true
      this.numbersOnDisplay = '0'
    },
    // numbersToDisplay() {
    //   // return this.numbersToDisplay || this.initialZeroOnDisplay
    //   // return this.numbersToDisplay || this.initialZeroOnDisplay
    //   console.log('hello')
    //   if (this.numbersOnDisplay.length) return this.numbersOnDisplay
    //   return this.initialZeroOnDisplay
    // }
  },
  computed: {
  },
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
