<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Customers</span>
      </h3>
      <div class="card-toolbar">
        <router-link
          to="/customers/create"
          class="btn btn-info font-weight-bolder font-size-sm"
          >Add New</router-link
        >
      </div>
    </div>
    <!--end::Header-->
    <search @search="onHandleSearch" /> <br/> <br/>
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
              <th class="pl-0" style="width: 30px">
                <label class="checkbox checkbox-lg checkbox-single mr-2">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </th>
              <th class="pl-0" style="min-width: 120px">Name</th>
              <th style="min-width: 110px">Phone</th>
              <th style="min-width: 120px">Email</th>
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
            <template v-if="!customers.length">
              <tr>
                <td colspan="9" align="center" class="text-muted">No Data</td>
              </tr>
            </template>
            <template v-for="(customer, i) in customers">
              <tr v-bind:key="i">
                <td class="pl-0 py-6">
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"
                    >{{ customer.name }}</a
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ customer.phone }}</span
                  >
                </td>
                <td>
                  <span class="font-weight-bolder d-block font-size-lg">{{
                    customer.email || "None"
                  }}</span>
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{
                      customer.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td class="pr-0 text-right">
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm"
                  >
                    <view-button />
                  </a>
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  >
                    <edit-button />
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
    <!--end::Body-->
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import EditButton from "../../content/components/EditButton";
import ViewButton from "../../content/components/ViewButton";
import Pagination from "../../../common/Pagination";
import Search from "../../../common/Search";
export default {
  name: "CustomersList",
  components: { Pagination, ViewButton, EditButton, Search },
  data() {
    return {
      displayPrompt: false,
      customerToEdit: "",
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    customers() {
      return this.$store.state.customer.customers;
    },
    queriedItems() {
      return this.$store.state.customer.total;
    },
    pages() {
      return this.$store.state.customer.pages;
    },
    perPage() {
      return this.customers.length;
    }
  },
  methods: {
    editData(customer) {
      this.customerToEdit = customer;
      this.displayPrompt = true;
    },
    handlePageChange() {
      this.$store.dispatch("customer/fetchCustomers", {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
    onHandleSearch(search) {
      this.$store.dispatch("customer/fetchCustomers", {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search
      });
    },
    onChangePageCount(pagecount) {
      this.$store.dispatch("customer/fetchCustomers", {
        currentPage: this.currentPage,
        itemsPerPage: pagecount
      });
    }
  },
  created() {
    this.$store.dispatch("customer/fetchCustomers", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
