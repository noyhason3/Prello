<template>
  <section class="task-controls">
    <!-- SUGGESTED                       ******TODO********
      <button>Join</button> -->

    <button @click="togglePopup('member')">Members</button>
    <popup-member
      v-if="memberOpen"
      @close-popup="memberOpen = false"
      @assign-member="assignMember"
    ></popup-member>
    <!-- <button>Labels</button> -->
    <button @click="togglePopup('checklist')">Checklist</button>
        <popup-checklist
      v-if="checklistOpen"
      @close-popup="checklistOpen = false"
    ></popup-checklist>
    <!-- <button>Due date</button> -->
    <!-- <button>Attachement</button> -->
    <!-- <button>Cover</button> -->
  </section>
</template>

<script>
import popupMember from "@/cmps/task/popup/popup-member";
import popupChecklist from '../popup/popup-checklist.vue';
export default {
  data() {
    return {
      memberOpen: false,
      checklistOpen: false
    };
  },
  methods: {
    togglePopup(str) {
      //this.$emit(`toggle-${str}`);
      var dataStr = `${str}Open`;
      this[dataStr] = !this[dataStr];
    },
    assignMember(member) {
      this.$emit("assign-member", member);
    },
  },
  components: { popupMember, popupChecklist  },
};
</script>

<styl
    PopupCheckliste>
</style>