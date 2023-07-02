<template>
  <section class="login">
    <div class="login-container">
      <div class="left-content">
        <img src="../assets/pictures/logo-image.png" alt="logo" />
        <h2>Login to Your Account</h2>
        <span>The faster you login, the faster we get to work</span>
        <form id="login-form" @submit.prevent="submitLogin">
          <label for="login-email">Email</label>
          <input
            v-model="email"
            type="email"
            id="login-email"
            placeholder="Enter email address ..."
            autocomplete="off"
            required
          />
          <label for="login-password">Password</label>
          <input
            v-model="password"
            type="password"
            id="login-password"
            placeholder="Enter password ..."
            autocomplete="off"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Or sign in with</p>
        <div class="google-box"></div>
        <p>Don't have an account? <a href="#">Register here</a></p>
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

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLogin']),
    submitLogin() {
      this.handleLogin(this.email, this.password)
    },
    goToRegisterForm() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped></style>
