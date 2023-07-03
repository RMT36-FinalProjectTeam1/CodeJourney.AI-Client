<template>
  <QuesionerChooseModels v-if="advancedPrompt.length === 0 && recommendedPrompt.length === 0"/>
  <QuesionerAdvanced v-if="advancedPrompt.length !== 0"/>
  <QuesionerRecommended v-if="recommendedPrompt.length !== 0"/>
</template>

<script>
import QuesionerChooseModels from '../components/QuesionerChooseModels.vue';
import QuesionerAdvanced from '../components/QuesionerAdvanced.vue';
import QuesionerRecommended from '../components/QuesionerRecommended.vue';
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerPage',
  components: {
    QuesionerChooseModels,
    QuesionerAdvanced,
    QuesionerRecommended
  },
  computed: {
    ...mapState(useCounterStore, ['advancedPrompt', 'recommendedPrompt'])
  },
}
</script>

<style scoped></style>