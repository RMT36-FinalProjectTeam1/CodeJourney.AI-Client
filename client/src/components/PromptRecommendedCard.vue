<template>
  <div class="schedule-card" @click="submitRecommendedPrompt('1')">
    <div class="left">
      <img src="../assets/pictures/vue-pict.png" alt="" />
    </div>
    <div class="right">
      <h4>Vue.js</h4>
      <span>4 weeks</span>
      <hr />
      <ul>
        <li>Pinia</li>
        <li>Composition API</li>
      </ul>
    </div>
  </div>
  <div class="schedule-card" @click="submitRecommendedPrompt('2')">
    <div class="left">
      <img src="../assets/pictures/vue-pict.png" alt="" />
    </div>
    <div class="right">
      <h4>Vue.js</h4>
      <span>4 weeks</span>
      <hr />
      <ul>
        <li>Pinia</li>
        <li>Composition API</li>
      </ul>
    </div>
  </div>
  <div class="schedule-card" @click="submitRecommendedPrompt('3')">
    <div class="left">
      <img src="../assets/pictures/vue-pict.png" alt="" />
    </div>
    <div class="right">
      <h4>Vue.js</h4>
      <span>4 weeks</span>
      <hr />
      <ul>
        <li>Pinia</li>
        <li>Composition API</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'PromptRecommendedCard',
  methods: {
    ...mapActions(useCounterStore, ['handleRecommendedPrompt']),
    submitRecommendedPrompt(id) {
      this.handleRecommendedPrompt(id)
    }
  },
  // mounted() {
  //   let dropdownBox = document.querySelector('.dropdown-box')
  //   let cardsBox = document.querySelector('.cards-box')

  //   dropdownBox.onclick = () => {
  //     cardsBox.classList.toggle('active')
  //   }
  // }
}
</script>

<style scoped></style>
