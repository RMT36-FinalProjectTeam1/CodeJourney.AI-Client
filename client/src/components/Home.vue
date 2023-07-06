<template>
  <section v-if="schedules" class="dashboard-v2">
    <div class="dashboard-v2-container">
      <div class="dashboard-v2-header">
        <h1>All Schedules</h1>
      </div>
      <div class="dashboard-v2-content">
        <RouterLink
          v-for="(schedule, i) in schedules"
          key="i"
          class="router-link"
          :to="`/schedule/${schedule._id}`"
        >
          <div class="schedule-card">
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
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
  <div v-if="!schedules" class="loader-xbox"></div>
</template>

<script>
import { mapState, mapWritableState,mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'Home',
  computed: {
    ...mapState(useCounterStore, ['schedules', 'lengthMonth']),
    ...mapWritableState(useCounterStore, ['currentMonth'])
  },
  methods: {
    ...mapActions(useCounterStore,['fetchSchedule']),
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
  },
  created() {
    this.fetchSchedule
  }
}
</script>

<style scoped>
.schedule-card:hover {
  opacity: 0.7;
}
.schedule-card h4,
.schedule-card span,
.schedule-card hr,
.schedule-card p,
.schedule-card h4 {
  color: #282634;
}
</style>
