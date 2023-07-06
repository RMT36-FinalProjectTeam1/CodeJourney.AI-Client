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
      <DashboardTableData/>
    </tbody>
  </table>
</template>

<script>
import DashboardTableData from './DashboardTableData.vue';

export default {
  name: 'DashboardTable',
  components: {
    DashboardTableData
  }
}
</script>

<style scoped></style>
