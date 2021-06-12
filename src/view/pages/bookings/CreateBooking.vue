<template>
  <div class="card card-custom card-transparent">
    <div class="card-body p-0">
      <!--begin: Wizard-->
      <div
        class="wizard wizard-4"
        id="kt_wizard_v4"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <!--begin: Wizard Nav-->
        <div class="wizard-nav">
          <div class="wizard-steps">
            <div
              class="wizard-step"
              data-wizard-type="step"
              data-wizard-state="current"
            >
              <div class="wizard-wrapper">
                <div class="wizard-number">
                  1
                </div>
                <div class="wizard-label">
                  <div class="wizard-title">
                    Book Room
                  </div>
                  <div class="wizard-desc">
                    Create Custom Account
                  </div>
                </div>
              </div>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-wrapper">
                <div class="wizard-number">
                  2
                </div>
                <div class="wizard-label">
                  <div class="wizard-title">
                    Completed
                  </div>
                  <div class="wizard-desc">
                    Review and Submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end: Wizard Nav -->

        <!--begin: Wizard Body-->
        <div class="card card-custom card-shadowless rounded-top-0">
          <div class="card-body p-0">
            <div class="row justify-content-center py-8 px-8 py-lg-15 px-lg-10">
              <div class="col-xl-12 col-xxl-7">
                <!--begin: Wizard Form-->
                <div class="form mt-0 mt-lg-10" id="kt_form">
                  <!--begin: Wizard Step 1-->
                  <div
                    class="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state="current"
                  >
                    <div class="mb-10 font-weight-bold text-dark">
                      Book a Room
                    </div>
                    <div class="form-group">
                      <label>Customer</label>
                      <select
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        v-model="customer_id"
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value=""></option>
                      </select>
                      <span class="form-text text-muted"
                        >Please select customer</span
                      >
                    </div>
                    <div class="row">
                      <div class="col-xl-6">
                        <div class="form-group">
                          <label>Start Date</label>
                          <datepicker
                            input-class="form-control form-control-solid form-control-lg"
                            v-model="start_date"
                          />
                          <span class="form-text text-muted"
                            >Please select start date.</span
                          >
                        </div>
                      </div>
                      <div class="col-xl-6">
                        <div class="form-group">
                          <label>End Date</label>
                          <datepicker
                            input-class="form-control form-control-solid form-control-lg"
                            v-model="end_date"
                          />
                          <span class="form-text text-muted"
                            >Please select end date.</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Room</label>
                      <select
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        v-model="room_id"
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value=""></option>
                      </select>
                      <span class="form-text text-muted"
                        >Please select room</span
                      >
                    </div>
                    <div class="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        class="form-control form-control-solid form-control-lg"
                        v-model="price"
                        readonly
                      />
                    </div>
                  </div>
                  <!--end: Wizard Step 1-->

                  <!--begin: Wizard Step 4-->
                  <div class="pb-5" data-wizard-type="step-content">
                    <div class="mb-10 font-weight-bold text-dark">
                      Review your Details and Submit
                    </div>
                    <div class="border-bottom mb-5 pb-5">
                      <div class="font-weight-bold mb-3">
                        Your Account Details:
                      </div>
                      <div class="line-height-md">
                        John Wick
                        <br />
                        Phone: +61412345678 <br />
                        Email: johnwick@reeves.com
                      </div>
                    </div>
                    <div class="border-bottom mb-5 pb-5">
                      <div class="font-weight-bold mb-3">
                        Your Address Details:
                      </div>
                      <div class="line-height-md">
                        Address Line 1
                        <br />
                        Address Line 2 <br />
                        Melbourne 3000, VIC, Australia
                      </div>
                    </div>
                    <div class="mb-5">
                      <div class="font-weight-bold mb-3">
                        Payment Details:
                      </div>
                      <div class="line-height-md">
                        Card Number: xxxx xxxx xxxx 1111
                        <br />
                        Card Name: John Wick <br />
                        Card Expiry: 01/21
                      </div>
                    </div>
                  </div>
                  <!--end: Wizard Step 4-->

                  <!--begin: Wizard Actions -->
                  <div class="d-flex justify-content-between border-top pt-10">
                    <div class="mr-2">
                      <button
                        class="btn btn-light-primary font-weight-bold text-uppercase px-9 py-4"
                        data-wizard-type="action-prev"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        v-on:click="submit"
                        class="btn btn-success font-weight-bold text-uppercase px-9 py-4"
                        data-wizard-type="action-submit"
                      >
                        Submit
                      </button>
                      <button
                        class="btn btn-primary font-weight-bold text-uppercase px-9 py-4"
                        data-wizard-type="action-next"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                  <!--end: Wizard Actions -->
                </div>
                <!--end: Wizard Form-->
              </div>
            </div>
          </div>
        </div>
        <!--end: Wizard Bpdy-->
      </div>
      <!--end: Wizard-->
    </div>
  </div>
</template>

<script>
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";
export default {
  name: "CreateBooking",
  components: {
    Datepicker
  },
  data() {
    return {
      customer_id: "",
      room_id: "",
      start_date: "",
      end_date: ""
    };
  },
  mounted() {
    // Initialize form wizard
    const wizard = new KTWizard("kt_wizard_v4", {
      startStep: 1, // initial active step number
      clickableSteps: true // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function(/*wizardObj*/) {
      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    wizard.on("change", function(/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  },
  methods: {
    submit(e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/pages/wizard/wizard-4.scss";
</style>
