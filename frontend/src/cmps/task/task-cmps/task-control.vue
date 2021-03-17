<template>
  <section class="task-controls">
    <!-- SUGGESTED                       ******TODO********
      <button>Join</button> -->

    <button @click="togglePopup('Member')">Members</button>
    <popup-member
      v-if="isMemberOpen"
      @close-popup="isMemberOpen = false"
      @assign-member="assignMember"
    ></popup-member>

    <button @click="togglePopup('Label')">Labels</button>
    <popup-label v-if="isLabelOpen"> </popup-label>


    <button @click="togglePopup('Checklist')">Checklist</button>
    <!-- <button>Due date</button> -->
    <!-- <button>Attachement</button> -->
    <!-- <button>Cover</button> -->
  </section>
</template>

<script>
import popupMember from "@/cmps/task/popup/popup-member";
import popupLabel from "@/cmps/task/popup/popup-member";
export default {
  data() {
    return {
      isMemberOpen: false,
      isLabelOpen: false,
      isChecklistOpen: false
    };
  },
  methods: {
    togglePopup(str) {
      //this.$emit(`toggle-${str}`);
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
    },
    assignMember(member) {
      this.$emit("assign-member", member);
    },
  },
  components: { 
    popupMember,
    popupLabel },
};
</script>

<style>
</style>