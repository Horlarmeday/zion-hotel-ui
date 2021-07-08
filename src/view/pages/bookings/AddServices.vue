<template>
  <b-modal v-model="activePrompt" size="lg" hide-footer title="Services">
    <div>
      <p>Select services</p>
      <div class="form-group">
        <h6>Total: ₦{{ addonsTotal }}</h6>
        <hr />
        <div class="checkbox-inline mt-2">
          <label class="checkbox" v-for="addon in addons" :key="addon.id">
            <input
              type="checkbox"
              @change="addAddon(addon, $event)"
              :value="addon"
            />
            <span></span>
            {{ addon.name }} (₦{{ addon.price }})
          </label>
        </div>
      </div>
      <button
        class="mt-3 btn btn-primary"
        @click="createServices"
        :disabled="isDisabled"
        ref="kt_service_submit"
      >
        Submit
      </button>
    </div>
  </b-modal>
</template>

<script>
import { arrayRemove } from "../../../helper";

export default {
  name: "AddServices",
  props: {
    displayPrompt: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      pickedAddon: [],
      bookingId: this.$route.params.bookingId,
      isDisabled: false
    };
  },
  computed: {
    addons() {
      return this.$store.state.addon.addons;
    },
    activePrompt: {
      get() {
        return this.displayPrompt;
      },
      set(value) {
        this.$emit("closeModal", value);
      }
    },
    addonsTotal() {
      return this.pickedAddon
        .map(addon => +addon.price)
        .reduce((a, b) => a + b, 0);
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

    addAddon(value, event) {
      if (event.target.checked) {
        this.pickedAddon.push(value);
      } else {
        const found = this.pickedAddon.find(element => element === value);
        this.pickedAddon = arrayRemove(this.pickedAddon, found);
      }
    },
    initializeRequest(button) {
      this.removeSpinner(button);
      this.$emit("closeModal");
      this.initValues();
    },
    createServices() {
      const obj = {
        addons: this.pickedAddon
      };
      // set spinner to submit button
      const submitButton = this.$refs["kt_service_submit"];
      this.addSpinner(submitButton);

      this.$store
        .dispatch("booking/addBookingAddons", {
          bookingId: this.bookingId,
          addons: obj
        })
        .then(() => this.initializeRequest(submitButton))
        .catch(() => this.removeSpinner(submitButton));
    },
    initValues() {
      this.pickedAddon = [];
    }
  },
  created() {
    this.$store.dispatch("addon/fetchAddons", {
      currentPage: 1,
      itemsPerPage: 100
    });
  }
};
</script>

<style scoped></style>
