<template>
  <div class="schedule-card" @click="submitRecommendedPrompt(schedule._id)">
    <div class="left">
      <img src="../assets/pictures/vue-pict.png" alt="" />
    </div>
    <div class="right">
      <h4>{{ schedule.title }}</h4>
      <span>{{ schedule.schedules.length / 5 }} Weeks</span>
      <hr />
      <ul>
        <li>{{ schedule.schedules[0].task }}</li>
        <li>{{ schedule.schedules[5].task }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'PromptRecommendedCard',
  props: ['schedule'],
  methods: {
    ...mapActions(useCounterStore, ['handleRecommendedPrompt']),
    submitRecommendedPrompt(id) {
      this.handleRecommendedPrompt(id)
    }
  },
  setup() {}
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
