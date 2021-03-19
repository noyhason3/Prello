<template>
  <section class="task-control">
    <!-- SUGGESTED                       ******TODO********
      <button>Join</button> -->

    <button @click="togglePopup('Member')">Members</button>
    <popup-member
      v-if="isMemberOpen"
      @close-popup="isMemberOpen = false"
      @assign-member="assignMember"
    ></popup-member>
    <!-- <button>Labels</button> -->
    <button @click="togglePopup('Checklist')">Checklist</button>
    <popup-checklist
      v-if="isChecklistOpen"
      @add-checklist="setChecklist"
    ></popup-checklist>

    <button @click="toggleGeneralPopup('Label')">Labels</button>

    <!-- <button>Due date</button> -->
    <button @click="toggleGeneralPopup('Attachment')">Attachement</button>
    <!-- <button>Cover</button> -->
  </section>
</template>

<script>
import popupMember from "@/cmps/task/popup/popup-member";
import popupChecklist from "@/cmps/task/popup/popup-checklist.vue";

export default {
  data() {
    return {
      isMemberOpen: false,
      isLabelOpen: false,
      isChecklistOpen: false,
      isAttachmentOpen:false
    };
  },
  methods: {
    togglePopup(str) {
      //this.$emit(`toggle-${str}`);
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
    },
    toggleGeneralPopup(str){
      this.$emit('toggle-popup', str)
    },
    assignMember(member) {
      this.$emit("assign-member", member);
    },
    setChecklist(checklist) {
      this.$emit("set-checklist", checklist);
    },
    setTaskLabels(labelIds) {
      this.$emit("set-task-labels", labelIds);
    },
  },
  components: {
    popupMember,
    popupChecklist,
  },
};
</script>
