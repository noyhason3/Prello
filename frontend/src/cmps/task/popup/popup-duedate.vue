<template>
  <pop-up class="popup popup-duedate">
    <div slot="header" class="task-popup-header">
      <h2>Change due date</h2>
      <button @click="togglePopup" class="btn close">X</button>
    </div>
    <div slot="main">
      <datepicker :inline="true" :value="this.date" @selected="setDate">
        <!-- <div slot="beforeCalendarHeader" class="calender-header">
          Choose a Date
        </div> -->
      </datepicker>
      <div class="date-input-container">
        <input class="date" type="checkbox" v-model="isDuedate" />
        <input class="date" type="text" v-model="day" />
        <input class="date" type="text" v-model="hour" />
      </div>
      <button class="btn action wide duedate-submit" @click="saveDate">
        Save
      </button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "../../common/pop-up.vue";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  props: {
    taskDuedate: Object,
  },
  data() {
    return {
      date:null,
      duedate: { date: null, isComplete: false },
      isDuedate: false,
    };
  },
  created() {
    if (this.taskDuedate?.date) this.duedate = this.taskDuedate;
    else this.duedate.date = Date.now();
    this.date = new Date(parseInt(this.duedate.date))
    this.isDuedate = true;
  },
  methods: {
    setDate(date) {
      this.date = date
      this.duedate.date = moment(date).format('x');
      this.isDuedate = true;
    },
    togglePopup() {
      this.$emit("toggle-popup", "Duedate");
    },
    saveDate() {
      // console.log('date:', this.duedate.date)
      if (this.isDuedate)
        this.$emit("save-date", { date:this.duedate.date, isComplete: this.duedate.isComplete })
      else this.$emit("save-date", {date:'', isComplete:false});
    },
  },
  computed: {
    day() {
      if (this.isDuedate) {
        return moment(this.date).format("D/M/YYYY");
      }
      return "";
    },
    hour() {
      if (this.isDuedate) {
        return moment(this.date).format("h:mm:ss A");
      }
      return "";
    },
  },
  components: {
    popUp,
    Datepicker,
  },
};
</script>


