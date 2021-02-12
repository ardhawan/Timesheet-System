import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import StudentDisplay from './StudentDisplay.vue'
import SettingDeadline from './SettingDeadline.vue'
import StaffDisplay from './StaffDisplay.vue'
import testing from './testing.vue'

Vue.use(Router);

// export default new Router({
const routes = [
  {
    path: '/sdisplay',
    component: StudentDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/app',
    component: App
  },
  {
    path: '/test',
    component: testing
  },
  {
    path: '/setdeadline',
    component: SettingDeadline
  },
  {
    path: '/stdisplay',
    component: StaffDisplay
  }
];

const router = new Router({
    // mode: "history",
    // base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("jwt") == null) {
        next({
          path: "/app"
        });
      } else {
        next();
      }
    } else {
      next();
    }
});

export default router;