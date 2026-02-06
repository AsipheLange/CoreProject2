<script setup>
import { ref } from "vue";
</script>

<template>
  <div id="nav">
    <router-link to="/home" class="link">
      <span class="icon"><i class="fa-solid fa-house"></i></span>
      <span class="link-text">Home</span>
    </router-link>
    <router-link to="/attendance" class="link">
      <span class="icon"><i class="fa-solid fa-calendar-days"></i></span>
      <span class="link-text">Attendance</span>
    </router-link>
    <router-link to="/employeeinfo" class="link">
      <span class="icon"><i class="fa-solid fa-address-card"></i></span>
      <span class="link-text">Employee Info</span>
    </router-link>
    <router-link to="/payroll" class="link">
      <span class="icon"><i class="fa-solid fa-money-bills"></i></span>
      <span class="link-text">Payroll</span>
    </router-link>
    <router-link to="/login" class="link">
      <span class="icon"><i class="fa-solid fa-right-from-bracket"></i></span>
      <span class="link-text">Logout</span>
    </router-link>
  </div>
</template>

<style scoped>
#nav {
  width: 50px; /* collapsed width */
  height: 100vh;
  background-color: #586ed0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 0;
  transition: width 0.3s;
  overflow: hidden;
  font-family: 'IBM Plex Sans', 'Inter', 'Roboto', sans-serif;
}

#nav:hover {
  width: 500px; /* expanded width */
}

.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  padding: 8px;
  border-radius: 5px;
  transition: background 0.2s;
}

.link:hover {
  background-color: #ffffff;
  color: #586ed0;
}

/* Icons always visible */
.icon {
  font-size: 1.2em;
  margin-right: 10px;
}

/* Hide text when collapsed */
.link-text {
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s;
}

/* Show text on hover of sidebar */
#nav:hover .link-text {
  opacity: 1;
}
</style>
