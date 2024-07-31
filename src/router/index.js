import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import NotesPage from '../pages/NotesPage.vue';
import NewNotePage from '../pages/NewNotePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/notes', component: NotesPage },
  { path: '/new', component: NewNotePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
