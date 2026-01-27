import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './themes.css';
import './style.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import { useWebVitals } from './composables/useWebVitals';

const app = createApp(App);

// Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error('[Global Error]:', err);
  console.error('[Component]:', instance);
  console.error('[Info]:', info);
  // Here you would typically send to Sentry or other error tracking service
};

app.use(createPinia());
app.use(router);
app.use(i18n); // Add i18n plugin

app.mount('#app');

// Set initial HTML lang attribute
document.documentElement.lang = i18n.global.locale.value;

// Initialize Web Vitals tracking
const { initWebVitals } = useWebVitals();
initWebVitals();
