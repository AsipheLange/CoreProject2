<script setup>
import Header from "./components/Header.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isLogin = computed(() => route.path === "/login");
</script>

<template>
  <div :class="['layout', { 'login-layout': isLogin }]">
    <!-- SIDEBAR -->
    <Header v-if="!isLogin" class="sidebar" />

    <!-- MAIN CONTENT -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

/* Main layout */
.layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.sidebar {
  flex-shrink: 0;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Login page only */
.login-layout {
  padding: 0;
}

.login-layout .main-content {
  padding: 0;
}
</style>
