<template>
  <tr v-for="(week, index) in monthlySchedule[currentMonth[selectedSchedule.scheduleTitle]]">
    <td>
      <span
        >week
        {{
          currentMonth[selectedSchedule.scheduleTitle]
            ? index + 1
            : 4 - monthlySchedule[currentMonth[selectedSchedule.scheduleTitle]].length + index + 1
        }}</span
      >
    </td>
    <td v-for="day in 5">
      <div
        class="td-cell"
        v-if="indexFinder(day, week) !== -1"
        @click="goToDetails(week[indexFinder(day, week)]._id)"
      >
        <div class="image">
          <img :src="setLogo(week[indexFinder(day, week)].task)" alt="" />
        </div>
        <div class="content">
          <span
            :class="{
              'status-completed': setStatus(week[indexFinder(day, week)].complete) === 'Completed',
              'status-uncomplete': setStatus(week[indexFinder(day, week)].complete) === 'Uncomplete'
            }"
            >{{ setStatus(week[indexFinder(day, week)].complete) }}</span
          >
          <p>{{ week[indexFinder(day, week)].task }}</p>
        </div>
      </div>
      <div v-else>Empty</div>
    </td>
  </tr>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import logos from '../techlogo.json'

export default {
  name: 'DashboardTableData',
  data() {
    return {
      Monthly_Schedule: [],
      ScheduleId: ''
    }
  },
  computed: {
    ...mapState(useCounterStore, ['currentMonth', 'monthlySchedule', 'selectedSchedule']),
    ...mapWritableState(useCounterStore, ['lengthMonth'])
  },
  methods: {
    setLogo(task) {
      let logo = '/logo/global1.png'
      task = task.toLowerCase()
      logos.every((el) => {
        if (task.includes(el.name, 0)) {
          logo = `/logo/${el.logo}`
          return false
        }
        return true
      })
      return logo
    },
    indexFinder(day, week) {
      return week.findIndex((el) => el.date.getDay() === day)
    },
    setStatus(status) {
      if (status) return 'Completed'
      else return 'Uncomplete'
    },
    goToDetails(id) {
      this.$router.push(`/detail/${this.selectedSchedule._id}/${id}`)
    }
  }
}
</script>

<style scoped>
.status-completed {
  background: rgb(30, 238, 30) !important;
}

.status-uncomplete {
  background: red !important;
}
</style>
