<template>
  <section class="advanced-model">
    <div class="advanced-model-container">
      <h2>Advanced Schedule</h2>
      <hr />
      <form id="advanced-form" @submit.prevent="submitPrompt">
        <label for="advanced-description">Enter description for your schedule details</label>
        <textarea
          v-model="description"
          id="advanced-description"
          rows="3"
          placeholder="Enter your description ..."
          autocomplete="off"
        ></textarea>
        <button type="submit">Generate</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerAdvancedSearch',
  data() {
    return {
      description: '',
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handlePrompt']),
    submitPrompt() {
      this.handlePrompt(this.description)
    }
  }
}
</script>

<style scoped></style>
