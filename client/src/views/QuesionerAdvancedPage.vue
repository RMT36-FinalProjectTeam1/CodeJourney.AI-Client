<template>
  <QuesionerAdvancedSearch v-if="prompt.length === 0" />
  <QuesionerAdvanced v-if="prompt.length !== 0" />
</template>

<script>
import QuesionerAdvancedSearch from '../components/QuesionerAdvancedSearch.vue'
import QuesionerAdvanced from '../components/QuesionerAdvanced.vue'
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'QuesionerAdvancedPage',
  components: {
    QuesionerAdvancedSearch,
    QuesionerAdvanced
  },
  computed: {
    ...mapState(useCounterStore, ['prompt'])
  },
  created() {
    console.log(this.prompt)
  }
}
</script>

<style scoped></style>
