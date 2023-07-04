<template>
  <section class="quesioner-checklist">
    <div class="quesioner-checklist-container">
      <h2 v-if="customSchedule">Custom Schedule</h2>
      <h2 v-if="recommendedSchedule">Recommended Schedule</h2>
      <hr />
      <p>From here, what do you want to learn?</p>
      <div class="date-item">
        <label for="start-date">Start Date:</label>
        <input type="date" id="start-date" form="checklist-task" v-model="startDate" />
      </div>
      <div class="task-form">
        <form id="checklist-task" @submit.prevent="submitCheckListPrompt">
          <div class="task-item">
            <input type="checkbox" id="task1" name="task1" v-model="task1" />
            <label for="task1">Basic Javascript</label>
          </div>
          <div class="task-item">
            <input type="checkbox" id="task2" name="task2" v-model="task2" />
            <label for="task2">Advance Javascript</label>
          </div>
          <div class="task-item">
            <input type="checkbox" id="task3" name="task3" v-model="task3" />
            <label for="task3">Basic React</label>
          </div>
          <div class="task-item">
            <input type="checkbox" id="task4" name="task4" v-model="task4" />
            <label for="task4">React Hooks</label>
          </div>
          <div class="task-item">
            <input type="checkbox" id="task5" name="task5" v-model="task5" />
            <label for="task5">Redux</label>
          </div>
        </form>
      </div>
      <div class="task-item all">
        <input type="checkbox" id="check-all" form="checklist-task" v-model="checkAll" @change="checkAllTasks" />
        <label for="check-all">Check All</label>
      </div>
      <input class="quesioner-checklist-button" type="submit" value="Submit" form="checklist-task" />
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
      task1: false,
      task2: false,
      task3: false,
      task4: false,
      task5: false,
      checkAll: false
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleCheckListPrompt']),
    submitCheckListPrompt() {
      const checklist = {
        startDate: this.startDate,
        task1: this.task1,
        task2: this.task2,
        task3: this.task3,
        task4: this.task4,
        task5: this.task5
      }
      this.handleCheckListPrompt(checklist)
    },
    checkAllTasks() {
      this.task1 = this.checkAll
      this.task2 = this.checkAll
      this.task3 = this.checkAll
      this.task4 = this.checkAll
      this.task5 = this.checkAll
    }
  },
  computed: {
    ...mapState(useCounterStore, ['prompt', 'customSchedule', 'recommendedSchedule'])
  },
  mounted() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = today.getDate()
    day = day < 10 ? '0' + day : day
    this.startDate = `${year}-${month}-${day}`
  }
}
</script>

<style scoped></style>
