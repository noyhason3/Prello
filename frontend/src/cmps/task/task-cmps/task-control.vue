<template>
  <section class="task-controls">
    <!-- SUGGESTED                       ******TODO********
      <button>Join</button> -->

    <button @click="toggle('Member')">Members</button>
    <popup-member
      v-if="memberOpen"
      @close-popup="memberOpen = false"
      @assign-member="
        (member) => {
          $emit('assign-member', member);
        }
      "
    ></popup-member>
    <button v-if="isLabelOpen" @click="toggle('Label')">Labels</button>
    <!-- <button>Checklist</button> -->
    <!-- <button>Due date</button> -->
    <!-- <button>Attachement</button> -->
    <!-- <button>Cover</button> -->
  </section>
</template>

<script>
import popupMember from "@/cmps/task/popup/popup-member";
export default {
  data() {
    return {
      isMemberOpen: false,
      isLabelOpen:false,
    };
  },
  methods: {
    toggle(str) {
      //this.$emit(`toggle-${str}`);
      var dataStr = `${str}Open`;
      this[dataStr] = !this[dataStr];
    },
  },
  components: { popupMember },
};
</script>

<style>
</style>