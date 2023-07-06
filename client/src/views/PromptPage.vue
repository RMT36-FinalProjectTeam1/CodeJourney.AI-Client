<template>
  <section class="schedule-model-new">
    <div class="schedule-model-new-container">
      <h2>Type Of Schedules</h2>
      <hr />
      <div class="schedule-content">
        <RouterLink to="/prompt/custom">
          <div class="schedule-button">
            <i class="bx bx-left-arrow-alt"></i>
            <p>CUSTOM</p>
          </div>
        </RouterLink>
        <RouterLink to="/prompt/recommended">
          <div class="schedule-button">
            <i class="bx bx-right-arrow-alt"></i>
            <p>RECOMMENDED</p>
          </div>
        </RouterLink>
      </div>
      <div class="schedule-description">
        <i class="bx bxs-info-circle"></i>
        <p>- Choose the custom one if you want to make a costumized Choose</p>
        <p>- Choose the recommended one if you're not sure about what you want to learn</p>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'PromptPage',
  components: { RouterLink }
}
</script>

<style scoped>
.schedule-button p,
.schedule-button i {
  color: #282634;
}

.schedule-button:hover p,
.schedule-button:hover i {
  color: #e2e1db;
}
</style>
