<template>
  <section class="question-advanced">
    <div class="question-advanced-container">
      <h2>Advanced Schedule</h2>
      <hr />
      <p>From here, what do you want to learn ?</p>
      <form>
        <div class="task-item">
          <input type="checkbox" id="task1" name="task1" />
          <label for="task1">Basic Javascript</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task2" name="task2" />
          <label for="task2">Advance Javascript</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task3" />
          <label for="task3">Basic React</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task3" />
          <label for="task3">React Hooks</label>
        </div>
        <div class="task-item">
          <input type="checkbox" id="task3" name="task3" />
          <label for="task3">Redux</label>
        </div>
        <input class="question-advanced-button" type="submit" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuesionerAdvanced'
}
</script>

<style scoped></style>
