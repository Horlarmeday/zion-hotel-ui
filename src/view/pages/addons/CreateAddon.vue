<template>
  <b-modal v-model="activePrompt" hide-footer title="Addon">
    <div class="mb-15">
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Name</label>
        <div class="col-lg-8">
          <input
            v-validate="'required'"
            data-vv-validate-on="blur"
            type="text"
            class="form-control form-control-sm form-control-solid"
            placeholder="Name"
            v-model="name"
            name="name"
          />
          <span class="text-danger text-sm">{{ errors.first("name") }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Price</label>
        <div class="col-lg-8">
          <input
            v-validate="'required'"
            data-vv-validate-on="blur"
            type="number"
            class="form-control form-control-sm form-control-solid"
            placeholder="Price"
            v-model="price"
            name="price"
          />
          <span class="text-danger text-sm">{{ errors.first("price") }}</span>
        </div>
      </div>
    </div>
    <button
      class="mt-3 btn btn-primary"
      @click="createAddon"
      :disabled="isDisabled"
      ref="kt_addon_submit"
    >
      Submit
    </button>
  </b-modal>
</template>

<script>
export default {
  name: "CreateAddon",
  props: {
    displayPrompt: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addon_id: "",
      price: "",
      name: "",
      isDisabled: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.name !== "";
    },
    activePrompt: {
      get() {
        return this.displayPrompt;
      },
      set(value) {
        this.$emit("closeModal", value);
      }
    }
  },
  watch: {
    displayPrompt(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        const { id, name } = JSON.parse(JSON.stringify(this.data));
        this.category_id = id;
        this.name = name;
      }
    }
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
      this.$emit("closeModal");
      this.initValues();
    },
    createAddon() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            insurance_id: this.insurance_id,
            name: this.name,
            description: this.description
          };
          // set spinner to submit button
          const submitButton = this.$refs["kt_addon_submit"];
          this.addSpinner(submitButton);

          if (this.category_id && this.category_id >= 0) {
            this.$store
              .dispatch("insurance/updateInsurance", obj)
              .then(() => this.initializeRequest(submitButton))
              .catch(() => this.removeSpinner(submitButton));
          } else {
            delete obj.insurance_id;
            this.$store
              .dispatch("insurance/addInsurance", obj)
              .then(() => this.initializeRequest(submitButton))
              .catch(() => this.removeSpinner(submitButton));
          }
        }
      });
    },
    initValues() {
      this.category_id = "";
      this.price = "";
      this.description = "";
      this.title = "";
      this.max_guest = "";
    }
  }
};
</script>

<style></style>
