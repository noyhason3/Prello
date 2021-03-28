<template>
  <ul>
    <!-- <div class="board-menu-layout">
      <div class="icon list"></div>
      <h3>Activity</h3>
    </div> -->
    <li v-for="activity in activities" :key="activity.id" class="clean-list board-menu-layout">
     <member-preview/> <div>{{ activity.txt }} {{ activity.created }}</div>
    </li>
  </ul>
</template>

<script>
  import memberPreview from './member-preview'
export default {
  props: {
    activities: Array,
  },
  computed: {
    date() {
      const timestamp = this.task.duedate;
      const day = moment.unix(timestamp).format("MMM D");
      const hour = moment.unix(timestamp).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
  },
  component:{
    memberPreview
  }
};
</script>
