<template>
  <section class="advanced-model" v-if="!customSchedule">
    <div class="advanced-model-container">
      <h2>Custom Schedule</h2>
      <hr />
      <form id="advanced-form" @submit.prevent="submitCustomPrompt">
        <label for="advanced-description">Enter prompt for your schedule details</label>
        <textarea
          id="advanced-description"
          rows="3"
          placeholder="Enter your prompt ..."
          autocomplete="off"
          v-model="description"
        ></textarea>
        <button type="submit">Generate</button>
      </form>
    </div>
  </section>
  <PromptChecklist v-if="customSchedule" />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import PromptChecklist from '../components/PromptChecklist.vue'
import { onBeforeMount } from 'vue'
export default {
  name: 'PromptCustomPage',
  components: {
    PromptChecklist
  },
  computed: {
    ...mapState(useCounterStore, ['customSchedule'])
  },
  data() {
    return {
      description: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleCustomPrompt']),
    submitCustomPrompt() {
      this.handleCustomPrompt(this.description)
    }
  },
  setup() {
    const counterStore = useCounterStore()
    onBeforeMount(() => {
      counterStore.customSchedule = false
    })
  }
}
</script>

<style scoped></style>
