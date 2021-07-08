<template>
  <div class="card card-custom gutter-b">
    <div class="card-body p-0">
      <!-- begin: Invoice-->
      <!-- begin: Invoice header-->
      <div class="row justify-content-center py-8 px-8 py-md-27 px-md-0">
        <div class="col-md-10">
          <div
            class="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row"
          >
            <h1 class="display-4 font-weight-boldest mb-10">BOOKING DETAILS</h1>
            <div class="d-flex flex-column align-items-md-end px-0">
              <!--begin::Logo-->
              <a href="#" class="mb-5">
                <img src="/media/zion-logo.png" alt="" width="220" />
              </a>
              <!--end::Logo-->
              <span class="d-flex flex-column align-items-md-end opacity-70">
                <span>Comfort Street, off Danbaba D, Suntai Way, Dinyavoh, Jalingo,</span>
                <span>Taraba State.</span>
                <span>info@zsh.com.ng</span>
                <span>+2347061713564</span>
              </span>
            </div>
          </div>
          <div class="border-bottom w-100"></div>
          <div class="d-flex justify-content-between pt-6">
            <div class="d-flex flex-column flex-root">
              <span class="font-weight-bolder mb-2">CHECKED IN DATE</span>
              <span class="opacity-70">{{
                booking.time_checked_in | moment("ddd, MMM Do YYYY, h:mma")
              }}</span>
            </div>
            <div class="d-flex flex-column flex-root">
              <span class="font-weight-bolder mb-2">BOOKING NO.</span>
              <span class="opacity-70">{{ booking.booking_code }}</span>
            </div>
            <div class="d-flex flex-column flex-root">
              <span class="font-weight-bolder mb-2">CUSTOMER.</span>
              <span class="opacity-70">{{ booking.customer.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- end: Invoice header-->
      <!-- begin: Invoice body-->
      <div class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
        <div class="col-md-10">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="pl-0 font-weight-bold text-muted text-uppercase">
                    Room
                  </th>
                  <th
                    class="text-right pr-0 font-weight-bold text-muted text-uppercase"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="font-weight-boldest">
                  <td class="border-0 pl-0 pt-7 d-flex align-items-center">
                    {{ booking.room.title }}
                  </td>
                  <td class="pr-0 pt-7 text-right align-middle">
                    ₦{{ Number(booking.room.price).toLocaleString() }}
                  </td>
                </tr>
                <p v-if="booking.addons.length">Services</p>
                <tr
                  class="font-weight-boldest border-bottom-0"
                  v-for="(add, i) in booking.addons"
                  :key="i"
                >
                  <td class="border-0 pl-0 d-flex align-items-center">
                    {{ add.name }}
                  </td>
                  <td class="pr-0 text-right align-middle">
                    ₦{{ Number(add.price).toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- end: Invoice body-->
      <!-- begin: Invoice footer-->
      <div
        class="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0 mx-0"
      >
        <div class="col-md-10">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="font-weight-bold text-muted text-uppercase">
                    AMOUNT DUE
                  </th>
                  <th class="font-weight-bold text-muted text-uppercase">
                    MODE OF PAYMENT
                  </th>
                  <th class="font-weight-bold text-muted text-uppercase">
                    PAYMENT DATE
                  </th>
                  <th
                    class="font-weight-bold text-muted text-uppercase text-right"
                  >
                    TOTAL PAID
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="font-weight-bolder">
                  <td>₦{{ totalDue }}</td>
                  <td>{{ payment.mode_of_payment }}</td>
                  <td>{{ payment.createdAt | moment("ddd, MMM Do YYYY") }}</td>
                  <td
                    class="text-primary font-size-h3 font-weight-boldest text-right"
                  >
                    ₦{{ payment.amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- end: Invoice footer-->
      <!-- begin: Invoice action-->
      <div class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
        <div class="col-md-10">
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-light-primary font-weight-bold"
              onclick="window.print();"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
      <!-- end: Invoice action-->
      <!-- end: Invoice-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewInvoice",
  data() {
    return {
      isDisabled: false,
      bookingId: this.$route.params.bookingId
    };
  },
  computed: {
    booking() {
      return this.$store.state.booking.booking;
    },
    payment() {
      return this.$store.state.payment.payment;
    },
    addonsTotal() {
      return this.booking.addons
        .map(addon => +addon.price)
        .reduce((a, b) => a + b, 0);
    },
    totalDue() {
      return +this.booking.room.price + this.addonsTotal;
    }
  },
  created() {
    this.$store.dispatch("booking/fetchBooking", this.bookingId);
    this.$store.dispatch("payment/fetchPaymentByBooking", this.bookingId);
  }
};
</script>

<style scoped></style>
