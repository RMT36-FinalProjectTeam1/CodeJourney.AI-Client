<template>
  <section class="detail" v-if="scheduleDetail">
    <div class="detail-container">
      <div class="detail-header">
        <div class="name-status">
          <h1>{{ selectedSchedule.scheduleTitle }}</h1>
          <span
            :class="{
              'status-completed': setStatus(scheduleDetail.complete) === 'Completed',
              'status-uncomplete': setStatus(scheduleDetail.complete) === 'Uncomplete'
            }"
            >{{ setStatus(scheduleDetail.complete) }}</span
          >
        </div>
        <p><span>Task :</span> {{ scheduleDetail.title }}</p>
        <div class="detail-buttons">
          <div>
            <button
              v-if="scheduleDetail.complete == false"
              @click="handlePatchTask(sch_id, task_id)"
            >
              Complete Task
            </button>
            <button @click="startQuiz">Start Quiz</button>
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
  <div v-if="!scheduleDetail" class="loader-xbox"></div>
</template>

<script>
import DetailAccordionData from '../components/DetailAccordionData.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Swal from 'sweetalert2'
export default {
  name: 'DetailPage',
  components: {
    DetailAccordionData
  },
  data() {
    return {
      task_id: '',
      sch_id: '',
      isLoading: true
    }
  },
  created() {
    this.task_id = this.$route.params.ts_id
    this.sch_id = this.$route.params.sc_id
    this.fetchScheduleDetail(this.sch_id, this.task_id)
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail', 'patchTask']),
    async fetchData(schId, taskId) {
      // console.log(this.isLoading)
      this.isLoading = true
      try {
        await this.fetchScheduleDetail(schId, taskId)
      } finally {
        this.isLoading = false
      }
    },
    handlePatchTask(sch_id, task_id) {
      Swal.fire({
        title: 'Are you sure complete this schedule?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.patchTask(sch_id, task_id)
        }
      })
    },
    backToSch() {
      this.$router.push(`/schedule/${this.sch_id}`)
    },
    setStatus(status) {
      if (status) return 'Completed'
      else return 'Uncomplete'
    },
    startQuiz() {
      this.currentQuizNumber = 0
      this.$router.push(`/quiz/${this.sch_id}/${this.task_id}`)
    }
  },
  computed: {
    ...mapState(useCounterStore, ['scheduleDetail', 'selectedSchedule']),
    ...mapWritableState(useCounterStore, 'currentQuizNumber')
  }
}
</script>

<style scoped>
.status-completed {
  background: rgb(30, 238, 30) !important;
}

.status-uncomplete {
  background: red !important;
}
</style>
