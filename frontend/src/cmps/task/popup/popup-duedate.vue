<template>
  <pop-up class="popup popup-duedate" style="overflow-y: auto">
    <div slot="header" class="task-popup-header">
      <h2>Change due date</h2>
      <button @click="togglePopup" class="btn close">X</button>
    </div>
    <div slot="main">
      <datepicker :inline="true" @selected="setDate" @opened="setTodayValue">
        <!-- <div slot="beforeCalendarHeader" class="calender-header">
          Choose a Date
        </div> -->
      </datepicker>
      <div class="date-input-container">
        <input type="checkbox" />
        <input type="text" v-model="date.day" />
        <input type="text" v-model="date.hour" />
      </div>
      <button class="btn" @click="saveDate">Save</button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "../../common/pop-up.vue";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  data() {
    return {
      date: {
        timestamp: "",
        day: "",
        hour: "",
      },
      //   highlighted:{date:new Date(Date.now())}
    };
  },
  methods: {
    setDate(date) {
      this.date.timestamp = moment(date, "M/D/YYYY hh:mm a").format("X");
      this.date.day = moment(date).format("M/D/YYYY ");
      this.date.hour = moment(date).format("h:mm:ss A");
    },
    togglePopup() {
      this.$emit("toggle-popup", "Duedate");
    },
    setTodayValue() {
      this.date = moment(Date.now()).format("M-D-YYYY h:mm:ss A");
    },
    saveDate() {
      this.$emit("save-date", this.date.timestamp);
    },
  },
  components: {
    popUp,
    Datepicker,
  },
};
</script>


