<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Addons</span>
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
    <search @search="onHandleSearch" />
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
              <th class="pl-0" style="min-width: 120px">S/N</th>
              <th style="min-width: 110px">Name</th>
              <th style="min-width: 120px">Price (₦)</th>
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
            <tr v-if="addons.length === 0">
            <td colspan="9" align="center" class="text-muted">No Data</td>
          </tr>
            <tr v-for="(addon, i) in addons" :key="i">
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
                  >{{ addon.name }}</span
                >
              </td>
              <td>
                <span class="font-weight-bolder d-block font-size-lg">{{
                  +addon.price.toString()
                }}</span>
              </td>
              <td>
                <span
                  class="text-dark-75 font-weight-bolder d-block font-size-lg"
                  >{{
                    addon.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                  }}</span
                >
              </td>
              <td class="pr-0 text-right">
                <a
                  href="#"
                  class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  @click="editData(addon)"
                >
                  <edit-button />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination
        :total-pages="pages"
        :total="queriedItems"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        @changepagecount="onChangePageCount"
      />
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <create-addon
      :displayPrompt="displayPrompt"
      @closeModal="hideModal"
      :data="addonToEdit"
    />
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import CreateAddon from "./CreateAddon";
import EditButton from "../../content/components/EditButton";
import Pagination from "../../../common/Pagination";
import Search from "../../../common/Search";
export default {
  name: "AddonsList",
  components: { Pagination, EditButton, CreateAddon, Search },
  data() {
    return {
      displayPrompt: false,
      addonToEdit: {},
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  methods: {
    addNewData() {
      this.addonToEdit = {};
      this.displayPrompt = true;
    },
    hideModal() {
      this.displayPrompt = false;
    },
    editData(addon) {
      this.addonToEdit = addon;
      this.displayPrompt = true;
    },
    handlePageChange() {
      this.$store.dispatch("addon/fetchAddons", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
    onHandleSearch(search) {
      this.$store.dispatch("addon/fetchAddons", {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search
      });
    },
    onChangePageCount(pagecount) {
      this.$store.dispatch("addon/fetchAddons", {
        currentPage: this.currentPage,
        itemsPerPage: pagecount
      });
    }
  },
  computed: {
    addons() {
      return this.$store.state.addon.addons;
    },
    queriedItems() {
      return this.$store.state.addon.total;
    },
    pages() {
      return this.$store.state.addon.pages;
    },
    perPage() {
      return this.addons.length;
    }
  },
  created() {
    this.$store.dispatch("addon/fetchAddons", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
