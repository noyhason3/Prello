<template>
  <ul v-if="activities">
    <li
      v-for="activity in activities"
      :key="activity.id"
      class="clean-list"
      :class="layoutClass"
    >
      <member-preview :member="activity.byMember" />
      <div>
        <p>
          <span>{{ activity.byMember.fullname }}</span> {{ activity.txt }}
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
      console.log("txt:", txt);
      if (txt) return txt.split("by")[0];
      return "";
    },
  },
  components: {
    memberPreview,
  },
};
</script>
