<template>
  <section class="quiz">
    <div class="quiz-background"></div>
    <div class="quiz-container">
      <div class="quiz-question">
        <h4>Questions from 1 to 10</h4>
        <p>What does Vue.js provide as a reactive and component-based JavaScript framework ?</p>
      </div>
      <div class="answer-choices">
        <button>A templating engine</button>
        <button>A state management library</button>
        <button>A server-side rendering solution</button>
        <button>A build tool for frontend development</button>
      </div>
      <div class="total-score">
        <h4>Total Score</h4>
        <p>100</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuizPage'
}
</script>

<style scoped></style>
