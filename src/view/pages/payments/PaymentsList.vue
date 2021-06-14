<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Payments</span>
      </h3>
    </div>
    <!--end::Header-->
    <div class="card-body" style="flex: 0.3">
      <div class="row">
        <div class="col-lg-6">
          <search @search="onHandleSearch" />
        </div>
        <div class="col-lg-6">
          <date-filter @filterbydate="searchByDate" label="Payments" />
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
              <th class="pl-0" style="min-width: 120px">Amount</th>
              <th style="min-width: 110px">Payment For</th>
              <th style="min-width: 110px">Mode of Payment</th>
              <th style="min-width: 120px">Customer</th>
              <th style="min-width: 120px">Payment Status</th>
              <th style="min-width: 110px">
                <span class="text-info">Date</span>
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
            <template v-for="(payment, i) in payments">
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
                    >{{ Number(payment.amount).toLocaleString() }}</a
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ payment.booking.room.title }}</span
                  >
                </td>
                <td>
                  <span class="font-weight-bolder d-block font-size-lg">{{
                    payment.mode_of_payment
                  }}</span>
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ payment.booking.customer.name }}</span
                  >
                </td>
                <td>
                  <span
                    class="label label-inline label-bold"
                    :class="displayLabel(payment.booking.payment_status)"
                    >{{ payment.booking.payment_status }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{
                      payment.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td class="pr-0 text-right">
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <view-button />
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
      <pagination
        :total-pages="pages"
        :total="queriedItems"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        @changepagecount="onChangePageCount"
      />
    </div>
    <!--end::Body-->
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import ViewButton from "../../content/components/ViewButton";
import Pagination from "../../../common/Pagination";
import Search from "../../../common/Search";
import DateFilter from "../../../common/DateFilter";
export default {
  name: "PaymentsList",
  components: {DateFilter, Pagination, ViewButton, Search },
  data() {
    return {
      displayPrompt: false,
      currentPage: 1,
      itemsPerPage: 10,
      start: null,
      end: null
    };
  },
  methods: {
    handlePageChange() {
      this.$store.dispatch("payment/fetchPayments", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
    onHandleSearch(search) {
      this.$store.dispatch("payment/fetchPayments", {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search
      });
    },
    onChangePageCount(pagecount) {
      this.$store.dispatch("payment/fetchPayments", {
        currentPage: this.currentPage,
        itemsPerPage: pagecount
      });
    },
    searchByDate(start, end) {
      (this.start = start), (this.end = end);
      this.currentPage = 1;
      this.$store.dispatch("payment/fetchPayments", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        start: this.start,
        end: this.end
      });
    },
    displayLabel(status) {
      if (status === "Pending") return "label-danger";
      if (status === "Complete") return "label-success";
      if (status === "Partial") return "label-warning";
      return "label-primary";
    }
  },
  computed: {
    payments() {
      return this.$store.state.payment.payments;
    },
    queriedItems() {
      return this.$store.state.payment.total;
    },
    pages() {
      return this.$store.state.payment.pages;
    },
    perPage() {
      return this.payments.length;
    }
  },
  created() {
    this.$store.dispatch("payment/fetchPayments", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
