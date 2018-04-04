import './style/main.css';
import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import App from './App';

Vue.use(VueResource);

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
