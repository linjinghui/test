import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../../example/demo.vue'

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo
    }
  ]
});
