<template>
  <b-modal size="lg" v-model="activePrompt" hide-footer title="Room">
    <div class="mb-15">
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Title</label>
        <div class="col-lg-8">
          <input
            v-validate="'required'"
            data-vv-validate-on="blur"
            type="text"
            class="form-control form-control-sm form-control-solid"
            placeholder="Title"
            v-model="title"
            name="title"
          />
          <span class="text-danger text-sm">{{ errors.first("title") }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Maximum Guest</label>
        <div class="col-lg-8">
          <input
            v-validate="'required'"
            data-vv-validate-on="blur"
            type="number"
            class="form-control form-control-sm form-control-solid"
            placeholder="Max Guest"
            v-model="max_guest"
            name="max_guest"
          />
          <span class="text-danger text-sm">{{
            errors.first("max_guest")
          }}</span>
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
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Category</label>
        <div class="col-lg-8">
          <select
            v-model="category_id"
            name="category"
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="form-control form-control-sm form-control-solid"
          >
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
              >{{ category.name }}</option
            >
          </select>
          <span class="text-danger text-sm">{{
            errors.first("category")
          }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-3 col-form-label">Description</label>
        <div class="col-lg-8">
          <textarea
            v-model="description"
            class="form-control form-control-sm form-control-solid"
            cols="30"
            rows="10"
          />
          <span class="text-danger text-sm">{{
            errors.first("description")
          }}</span>
        </div>
      </div>
    </div>
    <button
      class="mt-3 btn btn-primary"
      @click="createRoom"
      :disabled="isDisabled"
      ref="kt_room_submit"
    >
      Submit
    </button>
  </b-modal>
</template>

<script>
export default {
  name: "CreateRoom",
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
      room_id: "",
      price: "",
      description: "",
      title: "",
      max_guest: "",
      category_id: "",
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
    },
    categories() {
      return this.$store.state.category.categories;
    }
  },
  watch: {
    displayPrompt(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        const {
          id,
          title,
          description,
          price,
          max_guest,
          category_id
        } = JSON.parse(JSON.stringify(this.data));
        this.room_id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.max_guest = max_guest;
        this.category_id = category_id;
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

    createRoom() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.room_id,
            title: this.title,
            price: +this.price,
            max_guest: +this.max_guest,
            description: this.description,
            category_id: this.category_id
          };
          // set spinner to submit button
          const submitButton = this.$refs["kt_room_submit"];
          this.addSpinner(submitButton);

          if (this.room_id) {
            this.$store
              .dispatch("room/updateRoom", obj)
              .then(() => this.initializeRequest(submitButton))
              .catch(() => this.removeSpinner(submitButton));
          } else {
            delete obj.id;
            console.log(obj)
            this.$store
              .dispatch("room/addRoom", obj)
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
      this.room_id = "";
    }
  },
  created() {
    this.$store.dispatch("category/fetchCategories");
  }
};
</script>

<style></style>
