<template>
  <section class="quesioner-checklist">
    <div class="quesioner-checklist-container">
      <hr />
      <p>From here, what do you want to learn?</p>
      <div class="date-item">
        <label for="start-date">Start Date:</label>
        <input type="date" id="start-date" form="checklist-task" v-model="startDate" />
      </div>
      <div class="task-form">
        <form id="checklist-task" @submit.prevent="sendSchedule">
          <div class="task-item" v-for="task in tasks">
            <input type="checkbox" v-model="task.include" />
            <label for="task1">{{ task.task }}</label>
          </div>
        </form>
      </div>
      <div class="task-item all">
        <input
          type="checkbox"
          id="check-all"
          form="checklist-task"
          v-model="checkAll"
          @change="checkAllTasks"
        />
        <label for="check-all">Check All</label>
      </div>
      <input
        class="quesioner-checklist-button"
        type="submit"
        value="Submit"
        form="checklist-task"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'PromptChecklist',
  data() {
    return {
      startDate: '',
      checkAll: false,
      tasks: [],
      scheduleName : ""
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['postSchedule']),
    checkAllTasks() {
      if(this.checkAll){
        this.tasks.forEach(el =>{
          el.include = true
        })
      }else{
        this.tasks.forEach(el =>{
          el.include = false
        })
      }
    },
    sendSchedule(){
      const tasks = this.tasks.filter(el => el.include === true)
      const finalTask = tasks.map(el => {return {task:el.task}})
      this.postSchedule({
        startDate:this.startDate,
        title:this.scheduleName,
        tasks:finalTask
      })
    }
  },
  computed: {
    ...mapState(useCounterStore, ['tempSchedule'])
  },
  mounted() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = today.getDate()
    day = day < 10 ? '0' + day : day
    this.startDate = `${year}-${month}-${day}`
  },
  created() {
    this.scheduleName = this.tempSchedule.title
    this.tasks = this.tempSchedule.tasks.map(el =>{
      return {
        task : el.task,
        include : false
      }
    })
  }
}
</script>

<style scoped></style>
