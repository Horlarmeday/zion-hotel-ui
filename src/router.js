import Vue from "vue";
import Router from "vue-router";
import authStore from "@/core/services/store/auth/moduleAuth";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";
import store from "@/core/services/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/categories",
          name: "category",
          component: () => import("@/view/pages/categories/CategoriesList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/rooms",
          name: "rooms",
          component: () => import("@/view/pages/rooms/RoomsList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/addons",
          name: "addons",
          component: () => import("@/view/pages/addons/AddonsList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/staffs",
          name: "staffs",
          component: () => import("@/view/pages/staffs/StaffsList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/staffs/create",
          name: "createstaff",
          component: () => import("@/view/pages/staffs/CreateStaff.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/customers",
          name: "customers",
          component: () => import("@/view/pages/customers/CustomersList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/customers/create",
          name: "createcustomer",
          component: () => import("@/view/pages/customers/CreateCustomer.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/payments",
          name: "payments",
          component: () => import("@/view/pages/payments/PaymentsList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/bookings",
          name: "bookings",
          component: () => import("@/view/pages/bookings/BookingsList.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/bookings/create",
          name: "createbooking",
          component: () => import("@/view/pages/bookings/CreateBooking.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/bookings/:bookingId",
          name: "viewbooking",
          component: () => import("@/view/pages/bookings/ViewBooking.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/invoice/:bookingId",
          name: "viewinvoice",
          component: () => import("@/view/pages/bookings/ViewInvoice.vue"),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/custom-error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/login_pages/Login"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/login_pages/Login")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue"),
    }
  ]
});

router.beforeEach((to, from, next) => {
  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authStore.state.token) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
