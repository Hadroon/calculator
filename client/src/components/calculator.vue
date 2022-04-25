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
          :class="button.cssClass"
        >
          {{button.sign || button.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttons from '../utils/buttons'

export default {
  name: 'calculator-comp',
  data() {
    return {
      buttons,
      numbersOnDisplay: '0',
      storedDisplayNumber: '0',
      operation: '',
      newNumber: true,
      lastInput: '',
      memory: '',
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
    handleDecimal(value) {
      if (this.numbersOnDisplay.includes('.') && this.lastInput !== 'operation') return
      if (this.lastInput === 'operation') {
        this.numbersOnDisplay = '0.'
      } else {
        this.numbersOnDisplay += value
      }
      this.newNumber = false
      this.lastInput = 'number'
    },
    count() {
      const result = eval(this.storedDisplayNumber + this.operation + this.numbersOnDisplay)
      const resultStr = String(result)
      this.storedDisplayNumber = resultStr
      this.numbersOnDisplay = resultStr
    },
    reset() {
      this.operation = ''
      this.lastInput = ''
      this.storedDisplayNumber = '0'
      this.newNumber = true
      this.numbersOnDisplay = '0'
    },
    async apiCall(url = '', method = 'GET', body) {
      const response = await fetch(url, {
        method,
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'text/html'
        },
        body
      });
      return response.json()
    },
    async getMemory() {
      const url = '/get-memory'
      const method = 'GET'
      const result = await this.apiCall(url, method)
      this.numbersOnDisplay = result
    },
    async setMemory() {
      const url = '/set-memory'
      const method = 'POST'
      await this.apiCall(url, method, this.numbersOnDisplay)
    },
    async clearMemory() {
      const url = '/clear-memory'
      const method = 'GET'
      await this.apiCall(url, method)
    },
    async addToMemory() {
      const url = '/add-to-memory'
      const method = 'POST'
      await this.apiCall(url, method, this.numbersOnDisplay)
    },
    async subtractFromMemory() {
      const url = '/subtract-from-memory'
      const method = 'POST'
      await this.apiCall(url, method, this.numbersOnDisplay)
    },
  },
}
</script>
