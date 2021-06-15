<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Bookings</span>
      </h3>
      <div class="card-toolbar">
        <router-link
          to="/bookings/create"
          class="btn btn-info font-weight-bolder font-size-sm"
          >Add New</router-link
        >
      </div>
    </div>
    <!--end::Header-->
    <div class="card-body" style="flex: 0.3">
      <div class="row">
        <div class="col-lg-6">
          <search @search="onHandleSearch" />
        </div>
        <div class="col-lg-6">
          <date-filter @filterbydate="searchByDate" label="Bookings" />
        </div>
      </div>
    </div>
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
              <th style="min-width: 120px">Customer</th>
              <th style="min-width: 120px">Room</th>
              <th style="min-width: 120px">Status</th>
              <th style="min-width: 110px">
                <span class="text-info">Date Checked In</span>
                <span class="svg-icon svg-icon-sm svg-icon-primary">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Down-2.svg-->
                  <inline-svg
                    src="media/svg/icons/Navigation/Down-2.svg"
                  ></inline-svg>
                  <!--end::Svg Icon-->
                </span>
              </th>
              <th class="pr-0 text-right" style="min-width: 160px">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(booking, i) in bookings">
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
                    >{{ booking.booking_code }}</a
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ booking.customer.name }}</span
                  >
                </td>
                <td>
                  <span
                    class="font-weight-bolder d-block font-size-lg"
                    >{{ booking.room.title }}</span
                  >
                </td>
                <td>
                  <span
                    class="label label-lg label-inline"
                    :class="displayLabel(booking.status)"
                    >{{ booking.status }}</span
                  >
                </td>
                <td>
                  <span
                    v-if="booking.time_checked_in"
                    class="font-weight-bolder d-block font-size-lg"
                    >{{
                      booking.time_checked_in
                        | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                  <span
                    v-else
                    class="font-weight-bolder d-block font-size-lg"
                    >{{
                      booking.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td class="pr-0 text-right">
                  <router-link
                    :to="`/bookings/${booking.id}`"
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
import DateFilter from "../../../common/DateFilter";
import Search from "../../../common/Search";
import ViewButton from "../../content/components/ViewButton";
export default {
  name: "PaymentsList",
  components: { ViewButton, DateFilter, Search },
  data() {
    return {
      displayPrompt: false,
      bookingToEdit: {},
      start: null,
      end: null
    };
  },
  computed: {
    bookings() {
      return this.$store.state.booking.bookings;
    },
    queriedItems() {
      return this.$store.state.booking.total;
    },
    pages() {
      return this.$store.state.booking.pages;
    },
    perPage() {
      return this.bookings.length;
    }
  },
  methods: {
    searchByDate(start, end) {
      (this.start = start), (this.end = end);
      this.currentPage = 1;
      this.$store.dispatch("booking/fetchBookings", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        start: this.start,
        end: this.end
      });
    },
    handlePageChange() {
      this.$store.dispatch("booking/fetchBookings", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
    onHandleSearch(search) {
      this.$store.dispatch("booking/fetchBookings", {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search
      });
    },
    onChangePageCount(pagecount) {
      this.$store.dispatch("booking/fetchBookings", {
        currentPage: this.currentPage,
        itemsPerPage: pagecount
      });
    },
    displayLabel(status) {
      if (status === "Pending") return "label-warning";
      if (status === "Checked-Out") return "label-primary";
      if (status === "Checked-In") return "label-success";
      return "label-dark";
    }
  },
  created() {
    this.$store.dispatch("booking/fetchBookings", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
