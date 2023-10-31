import { createRouter, createWebHistory } from 'vue-router';

// Import your components for routing
import WeatherPage from './components/Weather/Weather.vue';
import PicturesPage from './components/Pictures/PicturesPage.vue';

const routes = [
  { path: '/', component: WeatherPage },
  { path: '/pictures', component: PicturesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
