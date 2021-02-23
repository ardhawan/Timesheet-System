import Vue from 'vue'
import Router from 'vue-router'
import Login from './Login.vue'
import StudentDisplay from './StudentDisplay.vue'
import StaffDisplay from './StaffDisplay.vue'
import AdminDisplay from './AdminDisplay.vue'
import SettingDeadline from './SettingDeadline.vue'
import DeadlineEmail from './DeadlineEmail.vue'

Vue.use(Router);

// export default new Router({
const routes = [
  {
    path: '/login',
    component: Login
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
      if (localStorage.getItem("userinfo") == null) {
        next({
          path: "/login"
        });
      } else {
        next();
      }
    } else {
      next();
    }
});

export default router;