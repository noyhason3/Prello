<template>
  <ul v-if="filteredActivities">
    <li
      v-for="activity in filteredActivities"
      :key="activity.id"
      class="clean-list"
      :class="layoutClass"
    >
      <member-preview :member="activity.byMember" />
      <div>
        <p>
          <span>{{ activity.byMember.fullname }}</span>
          {{ activityDescription(activity.txt) }}
        </p>
        <p>
          {{ date(activity.createdAt).day }} at
          {{ date(activity.createdAt).hour }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import memberPreview from "./member-preview.vue";
import moment from "moment";

export default {
  props: {
    activities: Array,
    layoutClass: String,
    isTaskList: Boolean,
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
    activityDescription(txt) {
      // console.log('txt:', txt)
      if (!txt) return "";
      let description = txt.split(",")[1];
      if(this.isTaskList) return description.split('card')[0] +' this card'
      // console.log('description:', description)
      return description;
    },
    // memberName(userName){
    //   if(userName.includes('Demo')) return 'Shuli Menahem';
    //   else return userName;
    // }
  },
  computed: {
    filteredActivities() {
      return this.activities.filter((activity) => !!activity).reverse();
    },
  },
  components: {
    memberPreview,
  },
};
</script>
