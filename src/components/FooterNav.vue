<template>
  <div class="footer-nav">
    <router-link to="/" class="nav-item" exact-active-class="active">
      <i class="fas fa-home"></i> <!-- Home icon -->
      Home
    </router-link>
    <router-link to="/notes" class="nav-item" exact-active-class="active">
      <i class="fas fa-sticky-note"></i> <!-- Notes icon -->
      Notes
    </router-link>
    <router-link to="/new" class="nav-item" exact-active-class="active">
      <i class="fas fa-plus-circle"></i> <!-- New Notes icon -->
      New Notes
    </router-link>
    <div class="nav-item" @click="toggleTheme">
      <i :class="themeIcon"></i>
      {{ themeLabel }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data() {
    return {
      darkTheme: false,
    };
  },
  computed: {
    themeIcon() {
      return this.darkTheme ? 'fas fa-sun' : 'fas fa-moon'; // Correct icons for light and dark
    },
    themeLabel() {
      return this.darkTheme ? 'Light' : 'Dark';
    },
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      document.body.classList.toggle('dark-theme', this.darkTheme);
      localStorage.setItem('darkTheme', this.darkTheme); // Save theme preference
    },
  },
  mounted() {
    // Initialize theme based on localStorage
    this.darkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }
};
</script>

<style scoped>
.footer-nav {
  display: flex;
  justify-content: center; /* Center nav items */
  width: 100%;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: transparent; /* No background color */
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 0.75rem; /* Smaller font size */
  margin: 0 0.5rem; /* Space between nav items */
}

.nav-item i {
  font-size: 1rem; /* Smaller icon size */
  margin-bottom: 4px;
}

.nav-item:hover {
  color: #0e6f78;
}

.active {
  color: #0e6f78;
}

.dark-theme .nav-item {
  color: #f5f5f5; /* Light text color for nav items in dark mode */
}

.dark-theme .nav-item.active {
  color: #a5a5e0; /* Soft blue for active nav item in dark mode */
}
</style>
