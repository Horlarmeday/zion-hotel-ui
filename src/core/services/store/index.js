import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/moduleAuth";
import staff from "./staff/moduleStaff";
import category from "./categories/moduleCategories";
import room from "./rooms/moduleRoom";
import customer from "./customers/moduleCustomer";
import addon from "./addons/moduleAddon";
import payment from "./payments/modulePayment";
import booking from "./bookings/moduleBooking";
import dashboard from "./dashboard/moduleDashboard";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    staff,
    category,
    room,
    customer,
    addon,
    payment,
    booking,
    dashboard,
    htmlClass,
    config,
    breadcrumbs
  },
  strict: process.env.NODE_ENV !== "production"
});
