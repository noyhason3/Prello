<template>
  <div class="task-duedate" v-if="duedate.date">
    <h4 class="task-info-headline">Due Date</h4>
    <div class="duedate-date">
      <input type="checkbox" v-model="isComplete" @change="toggleComplete" />
      <div class="flex date">
        <p v-if="date">{{ date.day }} at {{ date.hour }}</p>
        <p v-if="status" class="status" :class="status">{{status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    duedate: Object,
  },
  data() {
    return {
      isComplete: null,
    };
  },
  created() {
    this.isComplete = this.duedate.isComplete;
  },
  methods: {
    toggleComplete() {
      this.$emit("set-completion", this.isComplete);
    },
  },
  computed: {
    date() {
      const duedate = new Date(parseInt(this.duedate.date));
      const day = moment(duedate).format("MMM D");
      const hour = moment(duedate).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
    status(){
      if(this.duedate.isComplete) return 'complete';
      if(parseInt(this.duedate.date) - Date.now()< 0) return 'overdue';
      return null;
    }
  },
};
</script>

<style>
</style>