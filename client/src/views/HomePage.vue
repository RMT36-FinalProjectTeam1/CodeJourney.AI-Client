<template>
  <Sidebar />
  <RouterView v-if="!isLoading"></RouterView>
  <div v-if="isLoading" class="loader-xbox"></div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { RouterView } from 'vue-router'
export default {
  name: 'HomePage',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Sidebar
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchSchedule']),
    async fetchData() {
      await this.fetchSchedule()
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(useCounterStore, ['schedules'])
  }
}
</script>

<style scoped></style>
