import Vue from 'vue'
import Router from 'vue-router'
import Login from './Login.vue'
import StudentDisplay from './StudentDisplay.vue'
import StaffDisplay from './StaffDisplay.vue'
import AdminDisplay from './AdminDisplay.vue'
import SettingDeadline from './SettingDeadline.vue'
import DeadlineEmail from './DeadlineEmail.vue'
import SubmitTimesheet from './SubmitTimesheet.vue'
import VerifyTimesheetTable from './VerifyTimesheetTable.vue'
import VerifyTimesheetDetails from './VerifyTimesheetDetails.vue'
import VerifyTimesheetEmail from './VerifyTimesheetEmail.vue'
import ExportTimesheet from './ExportTimesheet.vue'
import ExportTimesheetEmail from './ExportTimesheetEmail.vue'

Vue.use(Router);

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
  },
  {
    path: '/subtimesheet',
    component: SubmitTimesheet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vrtable',
    component: VerifyTimesheetTable,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vrdetails/:displaydata',
    name: 'VerifyTimsheetDetails',
    component: VerifyTimesheetDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vremail',
    component: VerifyTimesheetEmail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exptimesheet',
    component:  ExportTimesheet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/expemail',
    component: ExportTimesheetEmail,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new Router({
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