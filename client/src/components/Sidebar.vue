<template>
  <section class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-logo">
        <RouterLink to="/">
          <img src="../assets/pictures/logo.png" alt="codejourney-logo" />
        </RouterLink>
      </div>
      <div class="sidebar-menu">
        <div class="sidebar-schedules">
          <ul>
            <li>
              <i class="bx bxs-dashboard"></i>
              <span>Schedules</span>
              <i class="bx bxs-down-arrow"></i>
            </li>
            <div class="the-schedule" v-if="schedules">
              <ul>
                <RouterLink
                  v-for="schedule in schedules"
                  :key="schedule._id"
                  class="router-link"
                  :to="`/schedule/${schedule._id}`"
                  :class="{ active: selectedSchedule === schedule._id }"
                >
                  <li>
                    <i class="bx bx-minus"></i>
                    <span>{{ schedule.scheduleTitle }}</span>
                  </li>
                </RouterLink>
              </ul>
            </div>
            <RouterLink to="/prompt">
              <li>
                <i class="bx bxs-plus-circle"></i>
                <span>Add New Schedule</span>
              </li>
            </RouterLink>
          </ul>
        </div>
        <div class="sidebar-user">
          <span>Welcome, {{ uname }}!</span>
          <ul>
            <li @click="handleLogout">
              <i class="bx bx-log-out"></i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'Sidebar',
  data() {
    return {
      uname: ''
    }
  },
  mounted() {
    let schedules = document.querySelector('.sidebar-schedules')
    this.uname = localStorage.username
    schedules.onclick = () => {
      schedules.classList.toggle('active')
    }
  },
  computed: {
    ...mapState(useCounterStore, ['schedules'])
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLogout'])
  }
}
</script>

<style scoped>
li {
  color: #ffffff;
}
.router-link {
  font-weight: 200;
  color: #ffffff;
}
</style>
