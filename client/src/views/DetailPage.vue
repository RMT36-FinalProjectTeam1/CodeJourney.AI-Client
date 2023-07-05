<template>
  <section class="detail" v-if="!isLoading">
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
  <div v-if="isLoading" class="loader-xbox"></div>
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
      sch_id: '',
      isLoading: true
    }
  },
  created() {
    this.task_id = this.$route.params.ts_id
    this.sch_id = this.$route.params.sc_id
    this.fetchScheduleDetail(this.sch_id, this.task_id)
  },
    mounted() {
    this.fetchScheduleDetail(this.sch_id, this.task_id).finally(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail', 'patchTask']),
    async fetchData(schId, taskId) {
      console.log(this.isLoading)
      this.isLoading = true
      try {
        await this.fetchScheduleDetail(schId, taskId)
      } finally {
        this.isLoading = false
      }
    },
    backToSch(){
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
