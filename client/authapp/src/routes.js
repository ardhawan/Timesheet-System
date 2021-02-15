import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import StudentDisplay from './StudentDisplay.vue'
import StaffDisplay from './StaffDisplay.vue'
import AdminDisplay from './AdminDisplay.vue'
import SettingDeadline from './SettingDeadline.vue'
import DeadlineEmail from './DeadlineEmail.vue'

Vue.use(Router);

// export default new Router({
const routes = [
  {
    path: '/app',
    component: App
  },
  {
    path: '/sdisplay',
    component: StudentDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stdisplay',
    component: StaffDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/amdisplay',
    component: AdminDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/setdeadline',
    component: SettingDeadline,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dlemail',
    component: DeadlineEmail,
    meta: {
      requiresAuth: true
    }
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