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
        const { id, name, price } = JSON.parse(JSON.stringify(this.data));
        this.addon_id = id;
        this.name = name;
        this.price = price;
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
            id: this.addon_id,
            name: this.name,
            price: +this.price
          };
          // set spinner to submit button
          const submitButton = this.$refs["kt_addon_submit"];
          this.addSpinner(submitButton);

          if (this.addon_id) {
            this.$store
              .dispatch("addon/updateAddon", obj)
              .then(() => this.initializeRequest(submitButton))
              .catch(() => this.removeSpinner(submitButton));
          } else {
            delete obj.id;
            this.$store
              .dispatch("addon/addAddon", obj)
              .then(() => this.initializeRequest(submitButton))
              .catch(() => this.removeSpinner(submitButton));
          }
        }
      });
    },
    initValues() {
      this.addon_id = "";
      this.price = "";
      this.name = "";
    }
  }
};
</script>

<style></style>
