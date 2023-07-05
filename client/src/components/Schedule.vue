<script>
import DashboardTable from '../components/DashboardTable.vue'
import { mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { ref } from 'vue'
export default {
  name: 'Schedule',
  components: {
    DashboardTable
  },
  data() {
    return {
      ScheduleId: 0,
      Schedule: {},
      ScheduleDiv: []
    }
  },
  created() {
    this.ScheduleId = this.$route.params.id
    this.Schedule = this.schedules.find((el) => el._id == this.ScheduleId)
    this.ScheduleDiv = this.divSchedule(this.Schedule)
  },
  computed: {
    ...mapState(useCounterStore, ['schedules', 'lengthMonth']),
    ...mapWritableState(useCounterStore, ['currentMonth']),
    getDuration() {
      const days = this.ScheduleDiv.length
      if (days < 24) return `${days} days`
      else return `${(days - (days % 4)) / 4 + 1} weeks`
    },
    getProgress() {
      const maxTask = this.ScheduleDiv.length
      const completeTask = 0
      this.ScheduleDiv.forEach((el) => {
        if (el.complete) completeTask++
      })
      return Math.ceil((completeTask / maxTask) * 100)
    }
  },
  methods: {
    divSchedule: (Schedule) => {
      const divSche = []
      let currentDate = new Date(Schedule.startDate)
      const { schedules } = Schedule
      schedules.forEach((el) => {
        let day = currentDate.getDay()
        if (day === 6) currentDate.setDate(currentDate.getDate() + 2)
        if (day === 0) currentDate.setDate(currentDate.getDate() + 1)
        el.date = new Date(currentDate)
        currentDate.setDate(currentDate.getDate() + 1)
      })
      return schedules
    },
    increaseMonth() {
      if (this.currentMonth[this.Schedule.name] !== this.lengthMonth[this.Schedule.name]) {
        this.currentMonth[this.Schedule.name]++
      }
    },
    decreaseMonth() {
      if (this.currentMonth[this.Schedule.name] !== 0) {
        this.currentMonth[this.Schedule.name]--
      }
    }
  },
  watch: {
    '$route.params': {
      handler() {
        this.ScheduleId = this.$route.params.id
        this.Schedule = this.schedules.find((el) => el._id == this.ScheduleId)
        this.ScheduleDiv = this.divSchedule(this.Schedule)
      },
      deep: true
    }
  }
}
</script>
<template>
  <section class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="name-delete">
          <h1>{{ Schedule.scheduleTitle }}</h1>
          <button><i class="bx bx-x-circle"></i>Delete Schedule</button>
        </div>
        <p>Estimated Time: {{ getDuration }}</p>
        <div class="progress-bar">
          <div class="percentage">
            <p>Goals Reached</p>
            <p>{{ getProgress }}%</p>
          </div>
          <progress max="100" :value="getProgress"></progress>
        </div>
        <hr />
      </div>
      <div class="dashboard-month">
        <i class="bx bx-left-arrow-alt" @click="decreaseMonth"></i>
        <span>Month 1</span>
        <i class="bx bx-right-arrow-alt" @click="increaseMonth"></i>
      </div>
      <div class="dashboard-table">
        <DashboardTable :schedule="ScheduleDiv" :scName="Schedule.name" :scId="ScheduleId" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
