<template>
  <section class="register">
    <div class="register-container">
      <div class="left-content">
        <img src="../assets/pictures/logo-image.png" alt="logo" />
        <h2>Create Your Account</h2>
        <span>Let's get started by creating your account first</span>
        <form id="register-form">
          <label for="register-username">Username</label>
          <input
            type="username"
            id="register-username"
            placeholder="Enter username ..."
            autocomplete="off"
            required
          />
          <label for="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            placeholder="Enter email address ..."
            autocomplete="off"
            required
          />
          <label for="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            placeholder="Enter password ..."
            autocomplete="off"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#">Login here</a></p>
      </div>
      <div class="right-content">
        <img src="../assets/pictures/login-image.jpg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterPage'
}
</script>

<style scoped></style>
