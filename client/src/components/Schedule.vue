<script>
import DashboardTable from '../components/DashboardTable.vue'
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'Schedule',
  components: {
    DashboardTable
  },
  data(){
    return{
      ScheduleId : 0,
      Schedule : {},
      ScheduleDiv : []
    }
  },
  created(){
    this.ScheduleId = this.$route.params.id
    console.log(this.schedules);
    this.Schedule = this.getSchedule(this.schedules,this.ScheduleId)

  },
  computed:{
    ...mapState(useCounterStore,['schedules'])
  },
  methods:{
    getSchedule : (schedules,id)=>{
      return schedules.find(el => el.id == id)
    },
    divSchedule : (Schedule) =>{
      const divSche = []
      const startDate = new Date(Schedule.start_date)
      const day = startDate.getDay()
      const {schedule} = Schedule
    }
  }
}
</script>
<template>
  <section class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="name-delete">
          <h1>{{ Schedule.name }}</h1>
          <button><i class="bx bx-x-circle"></i>Delete Schedule</button>
        </div>
        <p>Estimated Time: 4 Months</p>
        <div class="progress-bar">
          <div class="percentage">
            <p>Goals Reached</p>
            <p>54%</p>
          </div>
          <progress max="100" value="54"></progress>
        </div>
        <hr />
      </div>
      <div class="dashboard-month">
        <i class="bx bx-left-arrow-alt"></i>
        <span>Month 1</span>
        <i class="bx bx-right-arrow-alt"></i>
      </div>
      <div class="dashboard-table">
        <DashboardTable/>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
