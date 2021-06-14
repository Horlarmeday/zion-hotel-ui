<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Categories</span>
      </h3>
      <div class="card-toolbar">
        <a
          href="#"
          class="btn btn-info font-weight-bolder font-size-sm"
          @click="addNewData"
          >Add New</a
        >
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table
          class="table table-head-custom table-vertical-center"
          id="kt_advance_table_widget_1"
        >
          <thead>
            <tr class="text-left">
              <th class="pl-0" style="min-width: 120px">S/N</th>
              <th style="min-width: 110px">Name</th>
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
            <tr v-if="categories.length === 0">
              <td colspan="9" align="center" class="text-muted">No Data</td>
            </tr>
            <tr v-for="(category, i) in categories" :key="i">
              <td class="pl-0">
                <a
                  href="#"
                  class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"
                  >{{ i + 1 }}</a
                >
              </td>
              <td>
                <span
                  class="text-dark-75 font-weight-bolder d-block font-size-lg"
                  >{{ category.name }}</span
                >
              </td>
              <td>
                <span
                  class="font-weight-bolder d-block font-size-lg"
                  >{{
                  category.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                }}</span>
              </td>
              <td class="pr-0 text-right">
                <a
                  href="#"
                  @click="editData(category)"
                  class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                >
                  <edit-button />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <create-category
      :displayPrompt="displayPrompt"
      @closeModal="hideModal"
      :data="categoryToEdit"
    />
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import CreateCategory from "./CreateCategory";
import EditButton from "../../content/components/EditButton";
export default {
  name: "CategoriesList",
  components: { EditButton, CreateCategory },
  data() {
    return {
      displayPrompt: false,
      categoryToEdit: {}
    };
  },
  methods: {
    addNewData() {
      this.categoryToEdit = {};
      this.displayPrompt = true;
    },
    hideModal() {
      this.displayPrompt = false;
    },
    editData(category) {
      this.categoryToEdit = category;
      this.displayPrompt = true;
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    }
  },
  created() {
    this.$store.dispatch("category/fetchCategories");
  }
};
</script>

<style scoped></style>
