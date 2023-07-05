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
      this.isLoading = true
      try {
        await this.fetchSchedule()
      } finally {
        this.isLoading = false
      }
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

<style scoped>
.loader-xbox {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

.loader-xbox,
.loader-xbox:before,
.loader-xbox:after {
  position: absolute;
  border: 3px solid transparent;
  border-top: 3px solid #ff4057;
  border-radius: 50%;
  animation: rotate linear infinite;
  content: '';
}
.loader-xbox {
  height: 100px;
  width: 100px;
  animation-duration: 1.05s;
}
.loader-xbox:before {
  height: 75px;
  width: 75px;
  top: 10px;
  left: 10px;
  animation-duration: 10s;
}
.loader-xbox:after {
  height: 50px;
  width: 50px;
  top: 22px;
  left: 22px;
  animation-duration: 4s;
}
@keyframes rotate {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
</style>
