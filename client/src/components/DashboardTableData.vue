<template>
  <tr v-if="schedule[0]" v-for="(week, index) in schedule[currentMonth-1]">
    <td>
      <span>week {{ index + 1 }}</span>
    </td>
    <td v-for="(day, index) in week">
      <div class="td-cell">
        <div class="image">
          <img src="../assets/pictures/html-logo.png" alt="" />
        </div>
        <div class="content">
          <span>Complete</span>
          <p>{{ day.task }}</p>
        </div>
      </div>
    </td>
  </tr>
  <tr v-else>
    <td>loading</td>
  </tr>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'DashboardTableData',
  computed: {
    ...mapState(useCounterStore, ['schedule', 'currentMonth'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchSchedule'])
  },
  created() {
    this.fetchSchedule()
    // console.log(this.schedule[0].month_1[0].Week_1[0].Day_1.icon)
  }
}
</script>

<style scoped></style>
