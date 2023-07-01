<template>
  <Sidebar />
  <section class="detail">
    <div class="detail-container">
      <div class="detail-header">
        <div class="name-status">
          <h1>Schedule Name</h1>
          <span>Uncomplete</span>
        </div>
        <p><span>Task :</span> Learn HTML fundamentals</p>
        <div class="detail-buttons">
          <div>
            <button>Complete Task</button>
            <button>Start Quiz</button>
          </div>
          <button>Go Back</button>
        </div>
        <hr />
      </div>
      <div class="detail-content">
        <div class="youtube-container">
          <iframe
            class="youtube-video"
            src="https://www.youtube.com/embed/salY_Sm6mv4"
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
import Sidebar from '../components/Sidebar.vue'
import DetailAccordionData from '../components/DetailAccordionData.vue';

export default {
  name: 'DetailPage',
  components: {
    Sidebar,
    DetailAccordionData
  }
}
</script>

<style scoped></style>
