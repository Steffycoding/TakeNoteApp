<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div class="new-note-page">
      <h1>Create a New Note</h1>
      <input v-model="title" placeholder="Title" class="input-field" />
      <textarea v-model="content" placeholder="Notes" class="textarea-field"></textarea>
      <button @click="saveNote" class="save-button">SAVE</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NewNotePage',
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    saveNote() {
      if (this.title && this.content) {
        const newNote = {
          title: this.title,
          content: this.content,
          id: Date.now() // Unique ID for each note
        };
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        this.$router.push('/notes'); // Transition to notes page
      } else {
        alert('Both fields are required.');
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      done();
    }
  }
}
</script>

<style scoped>
.new-note-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: transparent; /* Transparent background for both light and dark mode */
  color: #333; /* Default text color */
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition for color and background */
}

h1 {
  margin-bottom: 20px;
  font-size: 1.75rem;
  color: #444; /* Default title color */
  text-align: center;
  transition: color 0.3s ease; /* Smooth transition for title color */
}

.dark-theme h1 {
  color: #e0e0e0; /* Light title color for dark mode */
}

.input-field,
.textarea-field {
  width: 100%;
  max-width: 500px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for focus states and shadow */
}

.dark-theme .input-field,
.dark-theme .textarea-field {
  background-color: #1e1e1e; /* Dark background for input fields in dark mode */
  border-color: #555; /* Darker border color for input fields in dark mode */
  color: #e0e0e0; /* Light text color for input fields in dark mode */
}

.input-field:focus,
.textarea-field:focus {
  border-color: #3ac8d5; /* Highlight border color on focus */
  outline: none;
  box-shadow: 0 0 8px rgba(58, 200, 213, 0.5); /* Subtle shadow on focus */
}

.save-button {
  padding: 12px 25px;
  font-size: 1rem;
  color: #fff;
  background-color: #3ac8d5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition for hover effect */
}

.save-button:hover {
  background-color: #33a8b5;
  transform: scale(1.03);
}

.dark-theme .save-button {
  background-color: #4a90e2; /* Adjusted color for dark mode */
}

.dark-theme .save-button:hover {
  background-color: #3f8ccf; /* Adjusted hover color for dark mode */
}

/* Fade effect for transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
