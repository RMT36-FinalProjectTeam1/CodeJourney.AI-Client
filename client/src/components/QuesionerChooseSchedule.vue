<template>
  <section class="schedule-model">
    <div class="schedule-model-container">
      <h2>Type Of Schedules</h2>
      <hr />
      <div class="schedule-content">
        <RouterLink to="/quesioner/advanced">
          <div class="schedule-button">
            <i class="bx bx-left-arrow-alt"></i>
            <p>ADVANCED</p>
          </div>
        </RouterLink>

        <RouterLink to="/quesioner/beginner">
          <div class="schedule-button">
            <i class="bx bx-right-arrow-alt"></i>
            <p>BEGINNER</p>
          </div>
        </RouterLink>
      </div>
      <div class="schedule-description">
        <i class="bx bxs-info-circle"></i>
        <p>- Choose the advanced one if you want to make a costumized Choose</p>
        <p>- Choose the beginner one if you're not sure about what you want to learn</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuesionerChooseSchedule'
}
</script>

<style scoped>
.schedule-button {
  color: #282634;
}
</style>
