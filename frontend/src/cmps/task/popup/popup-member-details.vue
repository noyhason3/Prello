<template>
  <pop-up>
    <div slot="main">
      <button @click="closeMemberDetails">X</button>
      <div class="member-initials" :style="{ 'background-color': member.color }">
        {{ member.initials }}
      </div>
      <h2>{{ member.fullname }}</h2>
      <h2>{{ member.username }}</h2>
      <button @click="removeMemberFromTask(member._id)">
        Remove from card
      </button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
export default {
  props: {
    member: Object,
  },
  methods: {
    closeMemberDetails(ev) {
        ev.stopPropagation();
      this.$emit("close-member-details");
    },
  },
  components: {
    popUp,
  },
};
</script>
