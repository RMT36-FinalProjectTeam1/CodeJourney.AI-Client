<template>
  <section class="schedule-model" v-if="!recommendedSchedule">
    <div class="schedule-model-container">
      <h1>Generate your schedule !</h1>
      <div class="recommended-schedule">
        <div class="dropdown-box">
          <h4>Here some popular Javascript schedules you can try</h4>
          <i class="bx bxs-down-arrow"></i>
        </div>
        <div class="cards-box">
          <PromptRecommendedCard />
        </div>
      </div>
    </div>
  </section>
  <PromptChecklist v-if="recommendedSchedule" />
</template>

<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import PromptRecommendedCard from '../components/PromptRecommendedCard.vue'
import PromptChecklist from '../components/PromptChecklist.vue'
export default {
  name: 'PromptRecommendedPage',
  components: {
    PromptRecommendedCard,
    PromptChecklist
  },
  computed: {
    ...mapState(useCounterStore, ['recommendedSchedule'])
  },
}
</script>

<style scoped></style>
