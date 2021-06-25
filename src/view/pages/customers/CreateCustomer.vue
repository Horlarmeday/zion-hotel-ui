<template>
  <div class="d-flex flex-column-fluid">
    <!--begin::Container-->
    <div class=" container ">
      <div class="row">
        <div class="col-lg-6 mx-auto">
          <!--begin::Card-->
          <div class="card card-custom gutter-b example example-compact">
            <div class="card-header">
              <h3 class="card-title">
                Create Customer Account
              </h3>
            </div>
            <!--begin::Form-->
            <div class="form">
              <div class="card-body">
                <div class="form-group">
                  <label>Full Name:</label>
                  <input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Enter full name"
                    v-model="name"
                    name="name"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("name")
                  }}</span>
                </div>
                <div class="form-group">
                  <label>Email address:</label>
                  <input
                    type="email"
                    class="form-control form-control-solid"
                    placeholder="Enter email"
                    v-model="email"
                    name="email"
                  />
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    maxlength="11"
                    minlength="11"
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Enter phone"
                    name="phone"
                    v-model="phone"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("phone")
                  }}</span>
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Enter address"
                    name="address"
                    v-model="address"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("address")
                  }}</span>
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="button"
                  class="btn btn-primary mr-2"
                  @click="createCustomer"
                  :disabled="isDisabled"
                  ref="kt_customer_submit"
                >
                  Submit
                </button>
                <router-link to="/customers" class="btn btn-secondary"
                  >Cancel</router-link
                >
              </div>
            </div>
            <!--end::Form-->
          </div>
          <!--end::Card-->
        </div>
      </div>
    </div>
    <!--end::Container-->
  </div>
</template>

<script>
export default {
  name: "CreateCustomer",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      address: "",
      isDisabled: false
    };
  },
  methods: {
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

    initializeRequest(button) {
      this.removeSpinner(button);
      this.initValues();
      this.$router.push("/customers");
    },

    createCustomer() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address
          };
          // set spinner to submit button
          const submitButton = this.$refs["kt_customer_submit"];
          this.addSpinner(submitButton);

          this.$store
            .dispatch("customer/addCustomer", obj)
            .then(() => this.initializeRequest(submitButton))
            .catch(() => this.removeSpinner(submitButton));
        }
      });
    },

    initValues() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.address = "";
    }
  }
};
</script>

<style scoped></style>
