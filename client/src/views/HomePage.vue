<template>
  <Sidebar />
  <section class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="name-delete">
          <h1>Schedule Name</h1>
          <button><i class="bx bx-x-circle"></i>Delete Schedule</button>
        </div>
        <p>Estimated Time: 4 Months</p>
        <div class="progress-bar">
          <div class="percentage">
            <p>Goals Reached</p>
            <p>54%</p>
          </div>
          <progress max="100" value="54"></progress>
        </div>
        <hr />
      </div>
      <div class="dashboard-month">
        <i class="bx bx-left-arrow-alt"></i>
        <span>Month 1</span>
        <i class="bx bx-right-arrow-alt"></i>
      </div>
      <div class="dashboard-table">
        <DashboardTable />
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import DashboardTable from '../components/DashboardTable.vue';

export default {
  name: 'HomePage',
  components: {
    Sidebar,
    DashboardTable
  }
}
</script>

<style scoped></style>
