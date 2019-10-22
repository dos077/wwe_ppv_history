import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DataEdit from '../views/DataEdit.vue';
import Headliners from '../views/Headliners.vue';
import Features from '../views/Features.vue';
import Wrestler from '../views/Wrestler.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/edit',
    name: 'edit',
    component: DataEdit,
  },
  {
    path: '/headliners',
    name: 'headliners',
    component: Headliners,
  },
  {
    path: '/features',
    name: 'features',
    component: Features,
  },
  {
    path: '/wrestler/:id',
    name: 'wrestler',
    component: Wrestler,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
