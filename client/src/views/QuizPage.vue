<template>
  <section v-if="scheduleDetail" class="quiz">
    <div class="quiz-background"></div>
    <div class="quiz-container">
      <div class="quiz-question">
        <h4>Questions from {{ quiz.currentIndex + 1 }} to {{ scheduleDetail.quiz.length }}</h4>
        <p>{{ scheduleDetail.quiz[quiz.currentIndex].question }}</p>
      </div>
      <div class="answer-choices">
        <button
          v-for="(option, index) in scheduleDetail.quiz[quiz.currentIndex].choices"
          @click="validateAnswer(index)"
          :disabled="quiz.userAnswers[quiz.currentIndex] != undefined"
          :class="
            quiz.userAnswers[quiz.currentIndex] != undefined &&
            scheduleDetail.quiz[quiz.currentIndex].answer == index
              ? 'rightanswer'
              : quiz.userAnswers[quiz.currentIndex] == index
              ? 'selectedanswer'
              : ''
          "
        >
          {{ option }}
        </button>
      </div>
      <div class="quiznav">
        <div style="display: flex; justify-content: flex-end">
          <button class="prev" @click="previousQuestion">Previous Question</button>
        </div>
        <div>
          <button class="next" @click="nextQuestion">{{ getButtonDisplay }}</button>
        </div>
      </div>
      <div class="total-score">
        <h4>Total Score</h4>
        <p>{{ quiz.score }}</p>
      </div>
    </div>
  </section>
  <div v-if="!scheduleDetail" class="loader-xbox"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'QuizPage',
  data() {
    return {
      sch_id: this.$route.params.sc_id,
      task_id: this.$route.params.ts_id,
      quiz: {
        currentIndex: 0,
        userAnswers: [],
        score: 0
      }
    }
  },
  computed: {
    ...mapState(useCounterStore, ['scheduleDetail']),
    getButtonDisplay() {
      if (this.quiz.currentIndex === this.scheduleDetail.quiz.length - 1) return 'Finish'
      else return 'Next Question'
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail']),
    nextQuestion() {
      if (this.quiz.currentIndex === this.scheduleDetail.quiz.length - 1) {
        this.$router.push(`/detail/${this.sch_id}/${this.task_id}`)
      } else {
        this.quiz.currentIndex++
      }
    },
    previousQuestion() {
      if (this.quiz.currentIndex !== 0) {
        this.quiz.currentIndex--
      }
    },
    validateAnswer(answerIndex) {
      this.quiz.userAnswers[this.quiz.currentIndex] = answerIndex
      if (answerIndex == this.scheduleDetail.quiz[this.quiz.currentIndex].answer) {
        this.quiz.score += 20
      }
    }
  },
  created() {
    this.fetchScheduleDetail(this.sch_id, this.task_id)
  }
}
</script>

<style scoped>
.rightanswer {
  background: var(--complete-color) !important;
  color: var(--white-color);
}

.selectedanswer {
  background: var(--red-color) !important;
  color: var(--white-color);
}

.quiznav {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 1rem;
}

.prev {
  padding: 10px;
  background: #7f1d1d;
  border: none;
  color: var(--white-color);
  font-size: var(--font-size-s);
  font-weight: 500;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}

.next {
  padding: 10px;
  background: #064e3b;
  border: none;
  color: var(--white-color);
  font-size: var(--font-size-s);
  font-weight: 500;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}

.next:hover:enabled {
  background: #047857;
}
.prev:hover:enabled {
  background: #991b1b;
}
</style>
