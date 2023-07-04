<template>
  <tr v-if="schedules[0].schedule[0]" v-for="(week, index) in schedules[0].schedule[0]">
    <td>
      <span>week {{ index + 1 }}</span>
    </td>
    <td v-for="(day, index) in week">
      <div class="td-cell">
        <div class="image">
          <img :src="setLogo(day.task)" alt="" />
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
import logos from '../techlogo.json'

export default {
  name: 'DashboardTableData',
  computed: {
    ...mapState(useCounterStore, ['schedules', 'currentMonth'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchSchedule']),
    setLogo(task){
      let logo = 'logo/global1.png'
      task = task.toLowerCase()
      logos.every(el =>{
        if(task.includes(el.name,0)) {
          logo = `/logo/${el.logo}`
          return false
        }
        return true
      })
      return logo
    }
  },
  created() {
    this.fetchSchedule()
    // console.log(this.schedule[0].month_1[0].Week_1[0].Day_1.icon)
  }
}
</script>

<style scoped></style>
