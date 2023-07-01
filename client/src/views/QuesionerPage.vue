<template>
  <QuesionerChooseSchedule />
  <!-- <QuesionerAdvancedSearch /> -->
  <!-- <QuesionerAdvanced /> -->
  <!-- <QuesionerBeginner /> -->
</template>

<script>
import QuesionerChooseSchedule from '../components/QuesionerChooseSchedule.vue';
import QuesionerAdvancedSearch from '../components/QuesionerAdvancedSearch.vue';
import QuesionerAdvanced from '../components/QuesionerAdvanced.vue';
import QuesionerBeginner from '../components/QuesionerBeginner.vue';

export default {
  name: 'QuesionerPage',
  components: {
    QuesionerChooseSchedule,
    QuesionerAdvancedSearch,
    QuesionerAdvanced,
    QuesionerBeginner
  }
}
</script>

<style scoped></style>