<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div class="notes-page">
      <!-- No Notes message -->
      <div v-if="notes.length === 0" class="no-notes">
        No Notes
      </div>
      
      <!-- Notes list -->
      <div v-else class="notes-list">
        <div v-for="note in paginatedNotes" :key="note.id" class="note">
          <template v-if="isEditing === note.id">
            <input v-model="editTitle" placeholder="Title" class="input-field" />
            <textarea v-model="editContent" placeholder="Notes" class="textarea-field"></textarea>
            <button @click="saveEdit(note.id)" class="save-button">SAVE</button>
          </template>
          <template v-else>
            <h3>{{ note.title }}</h3>
            <p>{{ note.content }}</p>
            <div class="note-actions">
              <button @click="startEditing(note)" class="action-button edit"><i class="fas fa-edit"></i></button>
              <button @click="deleteNote(note.id)" class="action-button delete"><i class="fas fa-trash-alt"></i></button>
            </div>
          </template>
        </div>
        
        <!-- Pagination controls -->
        <div v-if="notes.length > notesPerPage" class="pagination">
          <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
        </div>
      </div>
    </div>
  </transition>
</template>
>

<script>
export default {
  name: 'NotesPage',
  data() {
    return {
      notes: [],
      currentPage: 1,
      notesPerPage: 6,
      isEditing: null,
      editTitle: '',
      editContent: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.notes.length / this.notesPerPage);
    },
    paginatedNotes() {
      const start = (this.currentPage - 1) * this.notesPerPage;
      const end = start + this.notesPerPage;
      return this.notes.slice(start, end);
    }
  },
  methods: {
    fetchNotes() {
      this.notes = JSON.parse(localStorage.getItem('notes')) || [];
      this.adjustPageAfterDelete();
    },
    adjustPageAfterDelete() {
      // Adjust currentPage if it exceeds totalPages after deletion
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1; // Set to last page or first page if no notes
      }
    },
    startEditing(note) {
      this.isEditing = note.id;
      this.editTitle = note.title;
      this.editContent = note.content;
      this.$nextTick(() => {
        const element = document.querySelector(`.note[data-id="${note.id}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    saveEdit(id) {
      this.notes = this.notes.map(note =>
        note.id === id ? { ...note, title: this.editTitle, content: this.editContent } : note
      );
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.isEditing = null;
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.adjustPageAfterDelete(); // Adjust page after deletion
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  mounted() {
    this.fetchNotes();
  }
}
</script>


<style scoped>
.notes-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: transparent;
  color: #333;
  transition: color 0.3s ease, background-color 0.3s ease;
  overflow: hidden; /* Prevent scrollbars */
}

.dark-theme .notes-page {
  color: #e0e0e0;
  transition: color 0.3s ease, background-color 0.3s ease;
}

/* Fade effect for transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.no-notes {
  color: #a9a9a9;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 20px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  padding: 1rem;
  overflow: hidden; /* Prevent scrollbars */
  background: transparent;
}

.note {
  background-color: white;
  border: 1px solid #ddd;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.dark-theme .note {
  background-color: #00127a;
  border-color: #333;
}

.note:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.note-actions {
  display: flex;
  gap: 0.5rem;
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.note:hover .note-actions {
  opacity: 1;
}

.action-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.action-button:hover {
  color: #0056b3;
}

.action-button.edit:hover {
  color: #28a745;
}

.action-button.delete:hover {
  color: #dc3545;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.input-field, .textarea-field {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-field {
  font-size: 1rem;
}

.textarea-field {
  height: 100px;
}

.save-button {
  background-color: #1524a9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.save-button:hover {
  background-color: #003270e1;
}

/* Keyframes for fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
