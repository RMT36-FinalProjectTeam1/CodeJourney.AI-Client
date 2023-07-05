<template>
  <section class="detail" v-if="!isLoading">
    <div class="detail-container">
      <div class="detail-header">
        <div class="name-status">
          <h1>Schedule Name</h1>
          <span>Uncomplete</span>
        </div>
        <p><span>Task :</span> {{ scheduleDetail.title }}</p>
        <div class="detail-buttons">
          <div>
            <button>Complete Task</button>
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
import { mapActions,mapState } from 'pinia'
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
  },
  mounted() {
    this.fetchScheduleDetail(this.sch_id, this.task_id).finally(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchScheduleDetail']),
    backToSch(){
      this.$router.push(`/schedule/${this.sch_id}`)
    }
  },
  computed:{
    ...mapState(useCounterStore,['scheduleDetail'])
  }
}
</script>

<style scoped>
</style>
