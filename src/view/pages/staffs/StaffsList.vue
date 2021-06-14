<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Staffs</span>
      </h3>
      <div class="card-toolbar">
        <router-link
          to="/staffs/create"
          class="btn btn-info font-weight-bolder font-size-sm"
          >Add New</router-link
        >
      </div>
    </div>
    <!--end::Header-->
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
              <th style="min-width: 120px">Phone</th>
              <th style="min-width: 120px">Username</th>
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
            <template v-if="!staffs.length">
              <tr>
                <td colspan="9" align="center" class="text-muted">No Data</td>
              </tr>
            </template>
            <template v-for="(staff, i) in staffs">
              <tr v-bind:key="i">
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
                    >{{ staff.name }}</span
                  >
                </td>
                <td>
                  <span class="font-weight-bolder d-block font-size-lg">{{
                    staff.phone
                  }}</span>
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ staff.username }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{
                      staff.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td class="pr-0 text-right">
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <view-button />
                    </span>
                  </a>
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <edit-button />
                    </span>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
      <pagination
        :total-pages="pages"
        :total="queriedItems"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        @changepagecount="onChangePageCount"
      />
    </div>
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import ViewButton from "../../content/components/ViewButton";
import EditButton from "../../content/components/EditButton";
import Pagination from "../../../common/Pagination";
import Search from "../../../common/Search";
export default {
  name: "StaffsList",
  components: { Pagination, EditButton, ViewButton, Search },
  data() {
    return {
      displayPrompt: false,
      roomToEdit: {},
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  methods: {
    handlePageChange() {
      this.$store.dispatch("staff/fetchStaffs", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
    onHandleSearch(search) {
      this.$store.dispatch("staff/fetchStaffs", {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search
      });
    },
    onChangePageCount(pagecount) {
      this.$store.dispatch("staff/fetchStaffs", {
        currentPage: this.currentPage,
        itemsPerPage: pagecount
      });
    }
  },
  computed: {
    staffs() {
      return this.$store.state.staff.staffs;
    },
    queriedItems() {
      return this.$store.state.staff.total;
    },
    pages() {
      return this.$store.state.staff.pages;
    },
    perPage() {
      return this.staffs.length;
    }
  },
  created() {
    this.$store.dispatch("staff/fetchStaffs", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
