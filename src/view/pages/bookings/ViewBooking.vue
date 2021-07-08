<template>
  <!--begin::Card-->
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header h-auto py-4">
      <div class="card-title">
        <h3 class="card-label">
          Booking Details
          <span class="d-block text-muted pt-2 font-size-sm"
            >Preview of booking</span
          >
        </h3>
      </div>
      <div>
        <router-link
          :to="`/invoice/${bookingId}`"
          class="btn btn-outline-primary"
          v-if="booking.status === 'Checked-In'"
          >Invoice</router-link
        >
        <button class="btn btn-primary ml-2" @click="addNewData">
          Add Services
        </button>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-4">
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Customer Name:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">{{
            booking.customer.name
          }}</span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Booking Code:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">{{
            booking.booking_code
          }}</span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Room:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">{{
            booking.room.title
          }}</span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Amount Due:</label>
        <div class="col-8">
          <span class="form-control-plaintext"
            ><span class="font-weight-bolder"
              >₦{{ Number(booking.amount_due).toLocaleString() }}</span
            >
          </span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Payment Status:</label>
        <div class="col-8">
          <span
            class="label label-inline label-bold"
            :class="displayLabel(booking.payment_status)"
          >
            {{ booking.payment_status }}</span
          >
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Start Date:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">
            {{ booking.start_date | moment("ddd, MMM Do YYYY, h:mma") }}
          </span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">End Date:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">
            {{ booking.end_date | moment("ddd, MMM Do YYYY, h:mma") }}
          </span>
        </div>
      </div>
      <div class="form-group row my-2">
        <label class="col-4 col-form-label">Time Booked:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">
            {{ booking.createdAt | moment("ddd, MMM Do YYYY, h:mma") }}
          </span>
        </div>
      </div>
      <div class="form-group row my-2" v-if="booking.time_checked_in">
        <label class="col-4 col-form-label">Time Checked In:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">
            {{ booking.time_checked_in | moment("ddd, MMM Do YYYY, h:mma") }}
          </span>
        </div>
      </div>
      <div class="form-group row my-2" v-if="booking.time_checked_out">
        <label class="col-4 col-form-label">Time Checked Out:</label>
        <div class="col-8">
          <span class="form-control-plaintext font-weight-bolder">
            {{ booking.time_checked_out | moment("ddd, MMM Do YYYY, h:mma") }}
          </span>
        </div>
      </div>
      <div v-if="booking.addons">
        <hr />
        <div><strong>Services</strong></div>
        <ul>
          <li v-for="addon in booking.addons" :key="addon.id">
            {{ addon.name }} ({{ addon.price }})
          </li>
        </ul>
      </div>
    </div>
    <!--end::Body-->
    <!--begin::Footer-->
    <div class="card-footer">
      <button
        ref="kt_checkin_submit"
        :disabled="isDisabled"
        @click="checkIn"
        v-if="booking.status === 'Pending'"
        class="btn btn-success font-weight-bold mr-2"
      >
        Check In
      </button>
      <button
        ref="kt_checkout_submit"
        :disabled="isDisabled"
        @click="checkOut"
        v-if="booking.status === 'Checked-In'"
        class="btn btn-danger font-weight-bold mr-2"
      >
        Check Out
      </button>
    </div>
    <!--end::Footer-->
    <add-services :displayPrompt="displayPrompt" @closeModal="hideModal" />
  </div>
  <!--end::Card-->
</template>

<script>
import AddServices from "./AddServices";
export default {
  name: "ViewBooking",
  components: { AddServices },
  data() {
    return {
      isDisabled: false,
      bookingId: this.$route.params.bookingId,
      displayPrompt: false
    };
  },
  computed: {
    booking() {
      return this.$store.state.booking.booking;
    }
  },
  methods: {
    displayLabel(status) {
      if (status === "Pending") return "label-danger";
      if (status === "Complete") return "label-success";
      if (status === "Partial") return "label-warning";
      return "label-primary";
    },
    addNewData() {
      this.displayPrompt = true;
    },
    hideModal() {
      this.displayPrompt = false;
    },
    initializeRequest(button) {
      this.removeSpinner(button);
    },
    addSpinner(submitButton) {
      this.isDisabled = true;
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");
    },
    removeSpinner(submitButton) {
      this.isDisabled = false;
      submitButton.classList.remove(
        "spinner",
        "spinner-light",
        "spinner-right"
      );
    },
    checkIn() {
      const isConfirmed = confirm("Are you sure?");
      if (isConfirmed) {
        const submitButton = this.$refs["kt_checkin_submit"];
        this.addSpinner(submitButton);
        this.$store
          .dispatch("booking/checkIn", this.bookingId)
          .then(() => this.initializeRequest(submitButton))
          .catch(() => this.removeSpinner(submitButton));
      }
    },
    checkOut() {
      const isConfirmed = confirm("Are you sure?");
      if (isConfirmed) {
        const submitButton = this.$refs["kt_checkout_submit"];
        this.addSpinner(submitButton);
        this.$store
          .dispatch("booking/checkOut", this.bookingId)
          .then(() => this.initializeRequest(submitButton))
          .catch(() => this.removeSpinner(submitButton));
      }
    }
  },
  created() {
    this.$store.dispatch("booking/fetchBooking", this.bookingId);
  }
};
</script>

<style scoped></style>
