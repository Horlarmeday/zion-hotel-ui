<template>
  <!--begin::Base Table Widget 2-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"
          >New Arrivals</span
        >
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th class="p-0" style="width: 50px"></th>
              <th class="p-0" style="min-width: 150px"></th>
              <th class="p-0" style="min-width: 140px"></th>
              <th class="p-0" style="min-width: 120px"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!arrivals.length">
              <tr>
                <td colspan="9" align="center" class="text-muted">No Data</td>
              </tr>
            </template>
            <template v-for="(customer, i) in arrivals">
              <tr v-bind:key="i">
                <td class="pl-0 py-5">
                  <div class="symbol symbol-50 symbol-light mr-2">
                    <span class="symbol-label">
                      <img
                        src="media/svg/misc/005-bebo.svg"
                        class="h-50 align-self-center"
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >{{ customer.name }}</a
                  >
                  <!--                  <span class="text-muted font-weight-bold d-block">{{-->
                  <!--                    item.desc-->
                  <!--                  }}</span>-->
                </td>
                <td class="text-right">
                  <span class="text-muted font-weight-bold">{{
                    customer.address
                  }}</span>
                </td>
                <td class="text-right">
                  <span class="text-muted font-weight-bold">{{
                    customer.phone
                  }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Base Table Widget 2-->
</template>

<script>
export default {
  name: "Widget2",
  data() {
    return {
      show: "day",
      month: [
        {
          title: "Popular Authors",
          desc: "Most Successful",
          desc2: "Python, MySQL",
          users: "7200 Users",
          img: "media/svg/misc/015-telegram.svg"
        },
        {
          title: "Top Authors",
          desc: "Successful Fellas",
          desc2: "ReactJs, HTML",
          users: "4600 Users",
          img: "media/svg/misc/006-plurk.svg"
        },
        {
          title: "New Users",
          desc: "Awesome Users",
          desc2: "Laravel, Metronic",
          users: "890 Users",
          img: "media/svg/misc/003-puzzle.svg"
        },
        {
          title: "Bestseller Theme",
          desc: "Amazing Templates",
          desc2: "ReactJS, Ruby",
          users: "354 Users",
          img: "media/svg/misc/014-kickstarter.svg"
        },
        {
          title: "Active Customers",
          desc: "Best Customers",
          desc2: "AngularJS, C#",
          users: "6370 Users",
          img: "media/svg/misc/005-bebo.svg"
        }
      ],
      week: [
        {
          title: "Bestseller Theme",
          desc: "Amazing Templates",
          desc2: "ReactJS, Ruby",
          users: "354 Users",
          img: "media/svg/misc/014-kickstarter.svg"
        },
        {
          title: "Popular Authors",
          desc: "Most Successful",
          desc2: "Python, MySQL",
          users: "7200 Users",
          img: "media/svg/misc/015-telegram.svg"
        },
        {
          title: "Top Authors",
          desc: "Successful Fellas",
          desc2: "ReactJs, HTML",
          users: "4600 Users",
          img: "media/svg/misc/006-plurk.svg"
        },
        {
          title: "New Users",
          desc: "Awesome Users",
          desc2: "Laravel, Metronic",
          users: "890 Users",
          img: "media/svg/misc/003-puzzle.svg"
        },
        {
          title: "Active Customers",
          desc: "Best Customers",
          desc2: "AngularJS, C#",
          users: "6370 Users",
          img: "media/svg/misc/005-bebo.svg"
        }
      ],
      day: [
        {
          title: "Top Authors",
          desc: "Successful Fellas",
          desc2: "ReactJs, HTML",
          users: "4600 Users",
          img: "media/svg/misc/006-plurk.svg"
        },
        {
          title: "Popular Authors",
          desc: "Most Successful",
          desc2: "Python, MySQL",
          users: "7200 Users",
          img: "media/svg/misc/015-telegram.svg"
        },
        {
          title: "New Users",
          desc: "Awesome Users",
          desc2: "Laravel, Metronic",
          users: "890 Users",
          img: "media/svg/misc/003-puzzle.svg"
        },
        {
          title: "Active Customers",
          desc: "Best Customers",
          desc2: "AngularJS, C#",
          users: "6370 Users",
          img: "media/svg/misc/005-bebo.svg"
        },
        {
          title: "Bestseller Theme",
          desc: "Amazing Templates",
          desc2: "ReactJS, Ruby",
          users: "354 Users",
          img: "media/svg/misc/014-kickstarter.svg"
        }
      ]
    };
  },
  computed: {
    arrivals() {
      return this.$store.state.dashboard.arrivals;
    }
  },
  created() {
    this.$store.dispatch("dashboard/fetchArrivals");
  }
};
</script>
