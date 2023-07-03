<template>
  <section class="question-advanced">
    <div class="question-advanced-container">
      <h2>Advanced Schedule</h2>
      <hr />
      <p>From here, what do you want to learn ?</p>
      <form @submit.prevent="submitCheckListPrompt">
        <div class="task-item">
          <input type="checkbox" id="task1" name="task1" v-model="task1"/>
          <label for="task1">Basic Javascript</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task2" name="task2" v-model="task2"/>
          <label for="task2">Advance Javascript</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task3" v-model="task3"/>
          <label for="task3">Basic React</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task4" v-model="task4"/>
          <label for="task3">React Hooks</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task5" v-model="task5"/>
          <label for="task3">Redux</label>
        </div>
        <input class="question-advanced-button" type="submit" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerAdvanced',
  data() {
    return {
      task1: false,
      task2: false,
      task3: false,
      task4: false,
      task5: false,
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleCheckListPrompt']),
    submitCheckListPrompt() {
      const checklist = {
        task1: this.task1,
        task2: this.task2,
        task3: this.task3,
        task4: this.task4,
        task5: this.task5,
      };
      this.handleCheckListPrompt(checklist);
    },
  },
  computed: {
    ...mapState(useCounterStore, ['advancedPrompt']),
  }
}
</script>

<style scoped></style>
