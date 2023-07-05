<template>
  <section class="dashboard-v2">
    <div class="dashboard-v2-container">
      <div class="dashboard-v2-header">
        <h1>All Schedules</h1>
      </div>
      <div class="dashboard-v2-content">
        <div class="schedule-card" v-for="(schedule, i) in schedules" key="i">
          <RouterLink class="router-link" :to="`/schedule/${schedule._id}`">
            <h4>{{ schedule.scheduleTitle }}</h4>
            <span>Estimated Time : {{ getDuration(schedule.schedules) }}</span>
            <hr />
            <p>Total Tasks: {{ schedule.schedules.length }}</p>
            <div class="progress-bar">
              <div class="percentage">
                <p>Goals Reached</p>
                <p>{{ getProgress(schedule.schedules) }}</p>
              </div>
              <progress max="100" :value="getProgress(schedule.schedules)"></progress>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'Home',
  computed: {
    ...mapState(useCounterStore, ['schedules', 'lengthMonth']),
    ...mapWritableState(useCounterStore, ['currentMonth'])
  },
  methods: {
    getProgress(tasks) {
      const maxTask = tasks.length
      let completeTask = 0
      tasks.forEach((el) => {
        if (el.complete) completeTask++
      })
      return Math.ceil((completeTask / maxTask) * 100)
    },
    getDuration(tasks) {
      const days = tasks.length
      if (days < 24) return `${days} days`
      else return `${(days - (days % 4)) / 4 + 1} weeks`
    }
  }
}
</script>

<style scoped></style>
