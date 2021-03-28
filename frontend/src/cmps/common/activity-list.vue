<template>
  <ul>
    <li v-for="activity in activities" :key="activity.id" class="clean-list">
     <member-preview :member="activity.byMember" />
      <div>{{ activity.txt }} {{ date(activity.createdAt).day }} at {{date(activity.createdAt).hour}}</div>
    </li>
  </ul>
</template>

<script>
  import memberPreview from './member-preview.vue'
  import moment from "moment";

export default {
  props: {
    activities: Array,
  },
  methods: {
    date(timestamp) {
      const day = moment.unix(timestamp).format("MMM D");
      const hour = moment.unix(timestamp).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
  },
  components:{
    memberPreview
  }
};
</script>
