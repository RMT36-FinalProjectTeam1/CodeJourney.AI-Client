<template>
  <section class="schedule-model-v2">
    <div class="schedule-model-v2-container">
      <h1>Generate your schedule models !</h1>
      <div class="custom-schedule">
        <div class="search-box">
          <form class="search-form" @submit.prevent="submitAdvancedPrompt" id="search-form">
            <input
              v-model="description"
              type="text"
              id="description"
              placeholder="Enter description ..."
              autocomplete="off"
              required
            />
          </form>
          <button type="submit" form="search-form">Generate</button>
        </div>
        <div class="info-box">
          <i class="bx bxs-info-circle"></i>
          <p>
            A clear keyword eg: "Basic Javascript", "Learn React", "Javascript Asynchronous". will
            gerenate more precise schedule for you
          </p>
        </div>
      </div>

      <div class="recommended-schedule">
        <div class="dropdown-box">
          <h4>Here some popular Javascript schedules you can try</h4>
          <i class="bx bxs-down-arrow"></i>
        </div>
        <div class="cards-box">
          <QuesionerRecommendedCard />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import QuesionerRecommendedCard from './QuesionerRecommendedCard.vue'
export default {
  name: 'QuesionerChooseModels',
  components: {
    QuesionerRecommendedCard,
  },
  data() {
    return {
      description: '',
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleAdvancedPrompt']),
    submitAdvancedPrompt() {
      this.handleAdvancedPrompt(this.description)
    }
  }
}
</script>

<style scoped></style>
