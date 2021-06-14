<template>
  <div class="aside aside-left d-flex flex-column" id="kt_aside" ref="kt_aside">
    <!--begin::Brand-->
    <KTBrand></KTBrand>
    <!--end::Brand-->
    <!--begin::Nav Wrapper-->
    <div
      class="aside-nav d-flex flex-column align-items-center flex-column-fluid pt-7"
    >
      <!--begin::Nav-->
      <ul class="nav flex-column">
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Dashboard'">
          <router-link
            to="/dashboard"
            class="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
          >
            <i class="flaticon2-protection icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Bookings'">
          <router-link
            to="/bookings"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_2"
            role="tab"
          >
            <i class="flaticon2-list-3 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Customers'">
          <router-link
            to="/customers"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_3"
            role="tab"
          >
            <i class="flaticon-users-1 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Payments'">
          <router-link
            to="/payments"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_4"
            role="tab"
          >
            <i class="flaticon-price-tag icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Rooms'">
          <router-link
            to="/rooms"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_5"
            role="tab"
          >
            <i class="flaticon-home-2 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Staffs'">
          <router-link
            to="staffs"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_6"
            role="tab"
          >
            <i class="flaticon2-medical-records-1 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Categories'">
          <router-link
            to="/categories"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_5"
            role="tab"
          >
            <i class="flaticon2-graph-1 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
        <!--begin::Item-->
        <li class="nav-item mb-5" v-b-tooltip.hover.right="'Addons'">
          <router-link
            to="/addons"
            class="nav-link btn btn-icon btn-icon-white btn-lg"
            data-toggle="tab"
            data-target="#kt_aside_tab_6"
            role="tab"
          >
            <i class="flaticon2-box-1 icon-lg"></i>
          </router-link>
        </li>
        <!--end::Item-->
      </ul>
      <!--end::Nav-->
    </div>
    <!--end::Nav Wrapper-->
  </div>
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import KTBrand from "@/view/layout/brand/Brand";
import KTLayoutAside from "@/assets/js/layout/base/aside.js";

export default {
  name: "Aside",
  components: {
    KTBrand
  },
  mounted() {
    this.$nextTick(() => {
      // Init Aside
      KTLayoutAside.init(this.$refs["kt_aside"]);
    });
  }
};
</script>
