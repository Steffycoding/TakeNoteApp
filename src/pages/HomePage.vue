<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div class="home-page">
      <div class="title">
        <div class="main-title">sepk<span class="highlight">IT</span>t</div>
        <div class="subtitle">TAKE NOTE</div>
      </div>
      <footer-nav />
    </div>
  </transition>
</template>

<script>
import FooterNav from '@/components/FooterNav.vue'; // Adjust path if necessary

export default {
  name: 'HomePage',
  components: {
    FooterNav
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(-20px)';
    },
    enter(el, done) {
      el.offsetHeight; // Trigger a reflow
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      done();
    }
  }
}
</script>

<style scoped>
/* Define CSS variables for light and dark themes */
:root {
  --main-title-color-light: rgb(0, 0, 0);
  --subtitle-color-light: black;

  --main-title-color-dark: #ffffff;
  --subtitle-color-dark: #e0e0e0;
}

.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  transition: color 0.3s; /* Smooth color transition */
  opacity: 0; /* Start with opacity 0 */
  animation: fadeIn 0.8s forwards; /* Smooth fade-in animation */
}

/* Light theme styles */
.home-page {
  color: var(--main-title-color-light);
}

.main-title {
  font-size: 0.7rem;
  color: var(--main-title-color-light);
  transition: color 0.3s; /* Smooth color transition */
}

.highlight {
  color: rgb(63, 215, 246); /* Highlight color remains consistent */
}

.subtitle {
  font-size: 3rem;
  color: var(--subtitle-color-light);
  font-weight: 300;
  transition: color 0.3s; /* Smooth color transition */
}

/* Dark theme styles */
.dark-theme .home-page {
  color: var(--main-title-color-dark);
  animation: fadeInDark 0.8s forwards; /* Smooth fade-in animation for dark mode */
}

.dark-theme .main-title {
  color: var(--main-title-color-dark);
}

.dark-theme .highlight {
  color: rgb(63, 215, 246); /* Highlight color remains consistent */
}

.dark-theme .subtitle {
  color: var(--subtitle-color-dark);
}

/* Fade effect for transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Keyframes for fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Keyframes for fade-in animation in dark mode */
@keyframes fadeInDark {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
