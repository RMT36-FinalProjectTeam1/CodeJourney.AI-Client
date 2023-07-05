<template>
  <section class="quiz">
    <div class="quiz-background"></div>
    <div class="quiz-container">
      <div class="quiz-question">
        <h4>Questions from {{ currentQuizNumber + 1 }} to {{ scheduleDetail.quiz.length }}</h4>
        <p>{{ scheduleDetail.quiz[currentQuizNumber].question }}</p>
      </div>
      <div class="answer-choices">
        <button
          v-for="(option, index) in scheduleDetail.quiz[currentQuizNumber].choices"
          @click="validateAnswer(scheduleDetail.quiz[currentQuizNumber]._id, index)"
        >
          {{ option }}
        </button>
      </div>
      <button @click="previousQuestion">Previous Question</button>
      <button @click="nextQuestion">{{ getButtonDisplay }}</button>
      <div class="total-score">
        <h4>Total Score</h4>
        <p>{{ score }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'QuizPage',
  data() {
    return {
      sch_id: '',
      task_id: '',
      score: 0
    }
  },
  computed: {
    ...mapState(useCounterStore, ['scheduleDetail']),
    ...mapWritableState(useCounterStore, ['currentQuizNumber', 'quizAnwers']),
    getButtonDisplay() {
      if (this.currentQuizNumber === this.scheduleDetail.quiz.length) return 'Finish'
      else return 'Next Question'
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail']),
    nextQuestion() {
      if (this.currentQuizNumber === this.scheduleDetail.quiz.length) {
        this.$router.push(`/detail/${this.sch_id}/${this.task_id}`)
      }
      this.currentQuizNumber++
    },
    previousQuestion() {
      if (this.currentQuizNumber !== 0) {
        this.currentQuizNumber--
      }
    },
    validateAnswer(id, index) {
      this.quizAnwers[id].user_answer = index
      this.score = 0
      for (const key in this.quizAnwers) {
        if (this.quizAnwers[key].answer === this.quizAnwers[key].user_answer) {
          this.score += 20
        }
      }
    }
  },
  created() {
    this.task_id = this.$route.params.ts_id
    this.sch_id = this.$route.params.sc_id
    this.fetchScheduleDetail(this.sch_id, this.task_id)
  }
}
</script>

<style scoped></style>
