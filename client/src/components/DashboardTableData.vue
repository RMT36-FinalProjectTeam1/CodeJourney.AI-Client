<template>
  <tr v-for="(week,index) in Monthly_Schedule[currentMonth[scName]]">
    <td>
      <span>week {{ index + 1 }}</span>
    </td>
    <td v-for="day in 5">
      <div class="td-cell" v-if="indexFinder(day,week) !== -1">
        <div class="image">
          <img :src="setLogo(week[indexFinder(day,week)].task)" alt="" />
        </div>
        <div class="content">
          <span>{{ setStatus(week[indexFinder(day,week)].complete) }}</span>
          <p>{{ week[indexFinder(day,week)].task }}</p>
        </div>
      </div>
      <div v-else>Empty</div>
    </td>
  </tr>
</template>

<script>
import { mapState,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import logos from '../techlogo.json'

export default {
  name: 'DashboardTableData',
  props: ['schedule','scName'],
  data() {
    return {
      Monthly_Schedule: [],
    }
  },
  computed: {
    ...mapState(useCounterStore,['currentMonth']),
    ...mapWritableState(useCounterStore,['lengthMonth'])
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
    indexFinder(day,week){
      return week.findIndex(el => el.date.getDay() === day)
    },
    setStatus(status){
      if(status) return 'Completed'
      else return 'Uncomplete'
    }
  },
  created() {
    let month = this.schedule[0].date.getMonth()
    let monthTemp = []
    let weekTemp = []
    this.schedule.forEach((el) => {
      if (el.date.getMonth() !== month) {
        this.Monthly_Schedule.push(monthTemp)
        month = el.date.getMonth()
        monthTemp = []
      }
      if (el.date.getDay() === 1 && weekTemp !== []){
        monthTemp.push(weekTemp)
        weekTemp = []
      }
      weekTemp.push(el)
    })
    monthTemp.push(weekTemp)
    this.Monthly_Schedule.push(monthTemp)
    console.log(this.currentMonth);
    this.lengthMonth[this.scName] = this.Monthly_Schedule.length-1
  }
}
</script>

<style scoped></style>
