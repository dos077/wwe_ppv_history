import Vue from 'vue';
import VueRouter from 'vue-router';
import Headliners from '../views/Headliners.vue';
import Features from '../views/Features.vue';
import Wrestler from '../views/Wrestler.vue';
import ByYear from '../views/ByYear.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'about',
    component: About,
  },
  {
    path: '/headliners',
    name: 'headliners',
    component: Headliners,
    meta: {
      title: 'PPV - Headliners',
      metaTags: [
        {
          name: 'description',
          content: 'Headliners of WWE Pay-Per-View Events',
        },
      ],
    },
  },
  {
    path: '/features',
    name: 'features',
    component: Features,
    meta: {
      title: 'PPV - Feature Performers',
      metaTags: [
        {
          name: 'description',
          content: 'Feature Performers of WWE Pay-Per-View Events',
        },
      ],
    },
  },
  {
    path: '/wrestler/:id',
    component: Wrestler,
    meta: { title: 'Wrestler Profile' },
  },
  {
    path: '/byyear',
    component: ByYear,
    meta: { title: 'Stat Per Year' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
