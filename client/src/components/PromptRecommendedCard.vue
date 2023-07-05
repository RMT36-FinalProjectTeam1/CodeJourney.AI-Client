<template>
  <div class="schedule-card" :class="scheduleClass" @click="submitRecommendedPrompt(schedule._id)">
    <div class="left">
      <img
        v-if="schedule.title === 'Basic JavaScript'"
        src="../assets/pictures/js-pict.png"
        alt=""
      />
      <img v-if="schedule.title === 'React'" src="../assets/pictures/react-pict.png" alt="" />
      <img v-if="schedule.title === 'Vue'" src="../assets/pictures/vue-pict.png" alt="" />
      <img v-if="schedule.title === 'Express'" src="../assets/pictures/express-pict.png" alt="" />
      <img v-if="schedule.title === 'Node.js'" src="../assets/pictures/nodejs-pict.png" alt="" />
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
  computed: {
    scheduleClass() {
      return {
        'js-box': this.schedule.title === 'Basic JavaScript',
        'react-box': this.schedule.title === 'React',
        'vue-box': this.schedule.title === 'Vue',
        'express-box': this.schedule.title === 'Express',
        'node-box': this.schedule.title === 'Node.js'
      }
    }
  }
}
</script>

<style scoped>
.js-box {
  background: linear-gradient(to right, var(--white-color) 50%, #f0db4f);
}
.react-box {
  background: linear-gradient(to right, var(--white-color) 50%, #2ddaf8);
}
.vue-box {
  background: linear-gradient(to right, var(--white-color) 50%, #3fb984);
}
.express-box {
  background: linear-gradient(to right, var(--white-color) 50%, #828282);
}
.node-box {
  background: linear-gradient(to right, var(--white-color) 50%, #539e43);
}
</style>
