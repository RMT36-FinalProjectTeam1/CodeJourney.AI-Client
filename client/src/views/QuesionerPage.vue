<template>
  <QuesionerScheduleModel v-if="prompt.length === 0"/>
  <QuesionerChecklist v-if="customSchedule || recommendedSchedule"/>
</template>

<script>
import QuesionerScheduleModel from '../components/QuesionerScheduleModel.vue';
import QuesionerChecklist from '../components/QuesionerChecklist.vue';
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerPage',
  components: {
    QuesionerScheduleModel,
    QuesionerChecklist
  },
  computed: {
    ...mapState(useCounterStore, ['prompt', 'customSchedule', 'recommendedSchedule'])
  },
}
</script>

<style scoped></style>