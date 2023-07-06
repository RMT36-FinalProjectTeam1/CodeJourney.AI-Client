<script>
import DashboardTable from '../components/DashboardTable.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Swal from 'sweetalert2'
export default {
  name: 'Schedule',
  components: {
    DashboardTable
  },
  data() {
    return {
      ScheduleId: 0
    }
  },
  created() {
    this.ScheduleId = this.$route.params.id
    this.fetchScheduleById(this.ScheduleId)
  },
  computed: {
    ...mapState(useCounterStore, [
      'schedules',
      'lengthMonth',
      'selectedSchedule',
      'convertedSchedule'
    ]),
    ...mapWritableState(useCounterStore, ['currentMonth']),
    getDuration() {
      const days = this.convertedSchedule.length
      if (days < 24) return `${days} days`
      else return `${(days - (days % 4)) / 4 + 1} weeks`
    },
    getProgress() {
      const maxTask = this.convertedSchedule.length
      let completeTask = 0
      this.convertedSchedule.forEach((el) => {
        if (el.complete) completeTask++
      })
      return Math.ceil((completeTask / maxTask) * 100)
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['deleteSchedule', 'fetchScheduleById']),
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
      if (
        this.currentMonth[this.selectedSchedule.scheduleTitle] !==
        this.lengthMonth[this.selectedSchedule.scheduleTitle]
      ) {
        this.currentMonth[this.selectedSchedule.scheduleTitle]++
      }
    },
    decreaseMonth() {
      if (this.currentMonth[this.selectedSchedule.scheduleTitle] !== 0) {
        this.currentMonth[this.selectedSchedule.scheduleTitle]--
      }
    },
    handleDelete() {
      Swal.fire({
        title: `Delete ${this.selectedSchedule.scheduleTitle} schedule?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSchedule(this.$route.params.id)
        }
      })
    }
  },
  watch: {
    '$route.params': {
      handler(newValue) {
        if (newValue.id) {
          this.ScheduleId = this.$route.params.id
          this.fetchScheduleById(this.ScheduleId)
          console.log('watched')
        }
      },
      deep: true
    }
  }
}
</script>
<template>
  <section v-if="selectedSchedule" class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="name-delete">
          <h1>{{ selectedSchedule.scheduleTitle }}</h1>
          <button @click="handleDelete"><i class="bx bx-x-circle"></i>Delete Schedule</button>
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
        <span>Month {{ this.currentMonth[this.selectedSchedule.scheduleTitle] + 1 }}</span>
        <i class="bx bx-right-arrow-alt" @click="increaseMonth"></i>
      </div>
      <div class="dashboard-table">
        <DashboardTable />
      </div>
    </div>
  </section>
  <div v-if="!selectedSchedule" class="loader-xbox"></div>
</template>

<style scoped></style>
