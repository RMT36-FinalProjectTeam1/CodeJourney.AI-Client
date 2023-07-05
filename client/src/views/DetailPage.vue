<template>
  <section class="detail">
    <div class="detail-container">
      <div class="detail-header">
        <div class="name-status">
          <h1>{{ selectedSchedule.scheduleTitle }}</h1>
          <span>{{ setStatus(scheduleDetail.complete) }}</span>
        </div>
        <p><span>Task :</span> {{ scheduleDetail.title }}</p>
        <div class="detail-buttons">
          <div>
            <button @click="patchTask(sch_id, task_id)">Complete Task</button>
            <button>Start Quiz</button>
          </div>
          <button @click="backToSch">Go Back</button>
        </div>
        <hr />
      </div>
      <div class="detail-content">
        <div class="youtube-container">
          <iframe
            class="youtube-video"
            :src="scheduleDetail.reference.youtube.link"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="references-container">
          <h2>Another References</h2>
          <ul class="accordion">
            <DetailAccordionData />
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DetailAccordionData from '../components/DetailAccordionData.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'DetailPage',
  components: {
    DetailAccordionData
  },
  data() {
    return {
      task_id: '',
      sch_id: ''
    }
  },
  created() {
    this.task_id = this.$route.params.ts_id
    this.sch_id = this.$route.params.sc_id
    this.fetchScheduleDetail(this.sch_id, this.task_id)
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail', 'patchTask']),
    backToSch() {
      this.$router.push(`/schedule/${this.sch_id}`)
    },
    setStatus(status) {
      if (status) return 'Completed'
      else return 'Uncomplete'
    }
  },
  computed: {
    ...mapState(useCounterStore, ['scheduleDetail', 'selectedSchedule'])
  }
}
</script>

<style scoped></style>
