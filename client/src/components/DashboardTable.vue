<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
      </tr>
    </thead>
    <tbody>
      <DashboardTableData :schedule="schedule" :scName="scName"/>
    </tbody>
  </table>
</template>

<script>
import DashboardTableData from './DashboardTableData.vue';

export default {
  name: 'DashboardTable',
  props:['schedule','scName'],
  components: {
    DashboardTableData
  }
}
</script>

<style scoped></style>
