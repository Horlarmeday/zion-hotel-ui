<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"
          >Customers to Check out</span
        >
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table
          class="table table-head-custom table-vertical-center"
          id="kt_advance_table_widget_4"
        >
          <thead>
            <tr class="text-left">
              <th class="pl-0" style="width: 30px">
                <label class="checkbox checkbox-lg checkbox-single mr-2">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </th>
              <th class="pl-0" style="min-width: 120px">Booking Code</th>
              <th style="min-width: 110px">Customer</th>
              <th style="min-width: 120px">Time Checked In</th>
              <th style="min-width: 120px">Checkout Time</th>
              <th style="min-width: 120px">Status</th>
              <th class="pr-0 text-right" style="min-width: 160px">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!departures.length">
              <tr>
                <td colspan="9" align="center" class="text-muted">No Data</td>
              </tr>
            </template>
            <template v-for="(departure, i) in departures">
              <tr v-bind:key="i">
                <td class="pl-0 py-6">
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"
                    >{{ departure.booking_code }}</a
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ departure.customer.name }}</span
                  >
                </td>
                <td>
                  <span class="font-weight-bolder d-block font-size-lg">{{
                    departure.time_checked_in | moment("DD/MM/YYYY, h:mma")
                  }}</span>
                </td>
                <td>
                  <span
                    class="text-info font-weight-bolder d-block font-size-lg"
                    >{{
                      departure.end_date | moment("DD/MM/YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td>
                  <span
                    class="label label-inline label-bold"
                    :class="displayLabel(departure.status)"
                  >
                    {{ departure.status }}</span
                  >
                </td>
                <td class="pr-0 text-right">
                  <router-link
                    :to="`/bookings/${departure.id}`"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <view-button />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import ViewButton from "../../components/ViewButton";
export default {
  name: "departures",
  data() {
    return {
      checked: false
    };
  },
  components: { ViewButton },
  methods: {
    displayLabel(status) {
      if (status === "Pending") return "label-danger";
      if (status === "Checked-In") return "label-success";
      if (status === "Checked-Out") return "label-warning";
      return "label-primary";
    }
  },
  computed: {
    departures() {
      return this.$store.state.dashboard.departures;
    }
  },
  created() {
    this.$store.dispatch("dashboard/fetchDepartures");
  }
};
</script>
