<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");

const errorMessage = ref("");

const validUser = {
  username: "Group 8",
  password: "4ofus"
};

function login() {
  if (username.value === validUser.username && password.value === validUser.password) {
    errorMessage.value = "";
    router.push("/home");
  } else {
    errorMessage.value = "Invalid username or password!";
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">

      <!-- Company Name -->
      <h2 class="company-name">Modern Tech Solutions</h2>

      <h1>HR System Login</h1>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" type="text" required />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

        <button type="submit" class="login-btn">Login</button>
      </form>

    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f4ff; /* soft blue background */
  min-height: 100%;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
}

/* Login card */
.login-box {
  background: white;
  width: 350px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(88, 110, 208, 0.25);
  align-items: center;
  animation: fadeIn 0.8s ease-in;
}

/* Animation */
@keyframes fadeIn {
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Company heading */
.company-name {
  text-align: center;
  color: #4b47bd;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

/* Login heading */
h1 {
  text-align: center;
  color: #4b47bd;
  margin-bottom: 25px;
}

/* Inputs */
.input-group {
  margin-bottom: 18px;
  width: 93%;
}

label {
  font-weight: bold;
  color: #4b47bd;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #c7cdf4;
  border-radius: 8px;
  outline: none;
  margin-top: 5px;
}

input:focus {
  border-color: #586ed0;
  box-shadow: 0 0 0 2px rgba(88, 110, 208, 0.2);
}

/* Error message */
.error {
  color: #dc2626;
  margin-bottom: 10px;
}

/* Login button */
.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #586ed0;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #4b47bd;
}
</style>
