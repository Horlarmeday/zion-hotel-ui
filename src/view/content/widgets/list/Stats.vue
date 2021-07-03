<template>
  <!--begin::Mixed Widget 17-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <div class="card-title font-weight-bolder">
        <div class="card-label">
          Stats
        </div>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body p-0 d-flex flex-column">
      <!--begin::Items-->
      <div class="flex-grow-1 card-spacer">
        <div class="row row-paddingless mt-5 mb-10">
          <!--begin::Item-->
          <div class="col">
            <div class="d-flex align-items-center mr-2">
              <!--begin::Symbol-->
              <div
                class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0"
              >
                <div class="symbol-label">
                  <money-icon />
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="font-size-h4 text-dark-75 font-weight-bolder">
                  ₦{{ Number(stats.revenueSum).toLocaleString() || 0 }}
                </div>
                <div class="font-size-sm text-muted font-weight-bold mt-1">
                  Total Revenue
                </div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Item-->

          <!--begin::Item-->
          <div class="col">
            <div class="d-flex align-items-center mr-2">
              <!--begin::Symbol-->
              <div
                class="symbol symbol-45 symbol-light-danger mr-4 flex-shrink-0"
              >
                <div class="symbol-label">
                  <booking-icon />
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="font-size-h4 text-dark-75 font-weight-bolder">
                  {{ stats.bookingsCount }}
                </div>
                <div class="font-size-sm text-muted font-weight-bold mt-1">
                  Number of Bookings
                </div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Widget Item-->
        </div>

        <div class="row row-paddingless">
          <!--begin::Item-->
          <div class="col">
            <div class="d-flex align-items-center mr-2">
              <!--begin::Symbol-->
              <div
                class="symbol symbol-45 symbol-light-success mr-4 flex-shrink-0"
              >
                <div class="symbol-label">
                  <checkin-icon />
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="font-size-h4 text-dark-75 font-weight-bolder">
                  {{ stats.checkedInCount }}
                </div>
                <div class="font-size-sm text-muted font-weight-bold mt-1">
                  Number of Checked Ins
                </div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Item-->

          <!--begin::Item-->
          <div class="col">
            <div class="d-flex align-items-center mr-2">
              <!--begin::Symbol-->
              <div
                class="symbol symbol-45 symbol-light-primary mr-4 flex-shrink-0"
              >
                <div class="symbol-label">
                  <customers-icon />
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="font-size-h4 text-dark-75 font-weight-bolder">
                  {{ stats.customersCount }}
                </div>
                <div class="font-size-sm text-muted font-weight-bold mt-1">
                  Number of Customers
                </div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Item-->
        </div>
      </div>
      <!--end::Items-->

      <!--begin::Chart-->
      <div
        id="kt_mixed_widget_17_chart"
        class="card-rounded-bottom"
        data-color="warning"
        style="height: 200px"
      ></div>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 17-->
</template>

<script>
import MoneyIcon from "../../components/MoneyIcon";
import BookingIcon from "../../components/BookingIcon";
import CheckinIcon from "../../components/CheckinIcon";
import CustomersIcon from "../../components/CustomersIcon";
export default {
  name: "Stats",
  components: {CustomersIcon, CheckinIcon, BookingIcon, MoneyIcon},
  computed: {
    stats() {
      return this.$store.state.dashboard.stats;
    }
  },
  created() {
    this.$store.dispatch("dashboard/fetchStats");
  }
};
</script>

<style scoped></style>
