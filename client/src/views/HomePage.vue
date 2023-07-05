<template>
  <Sidebar />
  <router-view v-if="schedules.length"></router-view>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import { mapActions,mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { RouterView } from 'vue-router';
export default {
  name: 'HomePage',
  components: {
    Sidebar,
  },
  methods:{
    ...mapActions(useCounterStore,['fetchSchedule'])
  },
  created(){
    this.fetchSchedule()
  },
  computed:{
    ...mapState(useCounterStore,['schedules'])
  },
}
</script>

<style scoped></style>
