<template>
  <div id="app" :class="{ 'dark-theme': darkTheme }">
    <router-view></router-view>
    <FooterNav />
  </div>
</template>

<script>
import FooterNav from './components/FooterNav.vue'; // Adjust path if necessary

export default {
  name: 'App',
  components: {
    FooterNav
  },
  data() {
    return {
      darkTheme: localStorage.getItem('darkTheme') === 'true' || false
    };
  },
  watch: {
    darkTheme(newVal) {
      document.getElementById('app').classList.toggle('dark-theme', newVal); // Apply dark theme to #app
      localStorage.setItem('darkTheme', newVal);
    }
  },
  mounted() {
    document.getElementById('app').classList.toggle('dark-theme', this.darkTheme); // Initialize dark theme
  }
}
</script>

<style>
/* Global styles */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0;
}

.dark-theme {
  background-color: #1e1e2e; /* Dark background color for the entire app */
  color: #e5e5e5; /* Light text color for the entire app */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the app takes full viewport height */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
}

router-view {
  flex: 1;
  background: transparent; /* Ensure background is transparent */
}
</style>
