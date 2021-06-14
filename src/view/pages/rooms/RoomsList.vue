<template>
  <!--begin::Advance Table Widget 10-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Rooms</span>
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
              <th style="min-width: 110px">Price (₦)</th>
              <th style="min-width: 120px">Category</th>
              <th style="min-width: 120px">Max Guest</th>
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
              <th style="min-width: 120px">Status</th>
              <th class="pr-0 text-right" style="min-width: 160px">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!rooms.length">
              <tr>
                <td colspan="9" align="center" class="text-muted">No Data</td>
              </tr>
            </template>
            <template v-for="(room, i) in rooms">
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
                    >{{ room.title }}</a
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ Number(room.price).toLocaleString() }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-info font-weight-bolder d-block font-size-lg"
                    >{{ room.category.name }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ room.max_guest }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{
                      room.createdAt | moment("ddd, MMM Do YYYY, h:mma")
                    }}</span
                  >
                </td>
                <td>
                  <span
                    class="label label-lg label-inline"
                    :class="
                      `${
                        room.is_occupied
                          ? 'label-light-success'
                          : 'label-light-primary'
                      }`
                    "
                    >{{ room.is_occupied ? "Occupied" : "Free" }}</span
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
                    @click="editData(room)"
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
    </div>
    <!--end::Body-->
    <create-room
      :displayPrompt="displayPrompt"
      :data="roomToEdit"
      @closeModal="hideModal"
    />
  </div>
  <!--end::Advance Table Widget 10-->
</template>

<script>
import CreateRoom from "./CreateRoom";
import ViewButton from "../../content/components/ViewButton";
import EditButton from "../../content/components/EditButton";
export default {
  name: "RoomsList",
  components: { EditButton, ViewButton, CreateRoom },
  data() {
    return {
      displayPrompt: false,
      roomToEdit: {}
    };
  },
  methods: {
    addNewData() {
      this.roomToEdit = {};
      this.displayPrompt = true;
    },
    hideModal() {
      this.displayPrompt = false;
    },
    editData(room) {
      this.roomToEdit = room;
      this.displayPrompt = true;
    }
  },
  computed: {
    rooms() {
      return this.$store.state.room.rooms;
    }
  },
  created() {
    this.$store.dispatch("room/fetchRooms", {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
};
</script>

<style scoped></style>
