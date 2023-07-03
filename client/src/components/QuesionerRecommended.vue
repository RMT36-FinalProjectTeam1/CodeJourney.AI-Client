<template>
  <section class="question-recommended">
    <div class="question-recommended-container">
      <h2>Recommended Schedule</h2>
      <hr />
      <h4>Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}</h4>
      <p>{{ questions[currentQuestionIndex].question }}</p>
      <div class="answer-choices">
        <button v-for="(choice, index) in questions[currentQuestionIndex].choices" :key="index" @click="selectChoice(choice)">{{ choice }}</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerRecommended',
  data() {
    return {
      currentQuestionIndex: 0,
      questions: [
        {
          question: 'Which Javascript Framework do you want to learn?',
          choices: ['VueJS', 'ReactJS', 'AngularJS']
        },
        {
          question: 'Which programming language do you prefer?',
          choices: ['JavaScript', 'Python', 'Java', 'C++']
        },
        // Add more questions here
      ],
      selectedChoices: []
    };
  },
  methods: {
    ...mapActions(useCounterStore, ['handleChoicesPrompt']),
    selectChoice(choice) {
      this.selectedChoices.push(choice);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        // All questions answered, do something with the selected choices
        // console.log('Selected choices:', this.selectedChoices);
        this.handleChoicesPrompt(this.selectedChoices);
        // Reset the component to start over if needed
        this.currentQuestionIndex = 0;
        this.selectedChoices = [];
      }
    }
  }
}
</script>

<style scoped></style>
