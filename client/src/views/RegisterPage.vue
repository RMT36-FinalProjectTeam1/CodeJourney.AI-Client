<template>
  <section class="register">
    <div class="register-container">
      <div class="left-content">
        <img src="../assets/pictures/logo-image.png" alt="logo" />
        <h2>Create Your Account</h2>
        <span>Let's get started by creating your account first</span>
        <form id="register-form" @submit.prevent="submitRegister">
          <label for="register-username">Username</label>
          <input
            v-model="username"
            type="username"
            id="register-username"
            placeholder="Enter username ..."
            autocomplete="off"
            required
          />
          <label for="register-email">Email</label>
          <input
            v-model="email"
            type="email"
            id="register-email"
            placeholder="Enter email address ..."
            autocomplete="off"
            required
          />
          <label for="register-password">Password</label>
          <input
            v-model="password"
            type="password"
            id="register-password"
            placeholder="Enter password ..."
            autocomplete="off"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <RouterLink to="/login">Login here</RouterLink></p>
      </div>
      <div class="right-content">
        <img src="../assets/pictures/login-image.jpg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { RouterLink } from 'vue-router';
export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleRegister']),
    submitRegister() {
      this.handleRegister(this.username, this.email, this.password)
    }
  }
}
</script>

<style scoped></style>
