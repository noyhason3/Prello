<template>
  <section class="task-control">
    <!-- SUGGESTED                       ******TODO********
      <button>Join</button> -->

    <h6 class="add-to-card-btn"> ADD TO CARD  </h6>
    <button @click="togglePopup('Member')" class="control-btn">Members</button>
    <popup-member
      v-if="isMemberOpen"
      @close-popup="isMemberOpen = false"
      @assign-task-member="assignTaskMember"
      @toggle-popup="togglePopup"
      @remove-task-member="removeTaskMember"
    ></popup-member>
    <!-- <button>Labels</button> -->
    <button @click="togglePopup('Checklist')" class="control-btn">Checklist</button>
    <popup-checklist
      v-if="isChecklistOpen"
      @add-checklist="setChecklist"
      @toggle-popup="togglePopup"
    ></popup-checklist>

    <button @click="toggleGeneralPopup($event, 'Label')" class="control-btn">Labels</button>

    <!-- <button>Due date</button> -->
    <button @click="togglePopup('Attachment')" class="control-btn">Attachement</button>
    <popup-attachment
      v-if="isAttachmentOpen"
      @save-attachments="saveAttachments"
      @toggle-popup="togglePopup"
      :attachments="attachments"
    />
    <!-- <button>Cover</button> -->
  </section>
</template>

<script>
import popupMember from "@/cmps/task/popup/popup-member";
import popupChecklist from "@/cmps/task/popup/popup-checklist.vue";
import popupAttachment from "@/cmps/task/popup/popup-attachment.vue";

export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      isMemberOpen: false,
      isLabelOpen: false,
      isChecklistOpen: false,
      isAttachmentOpen: false,
    };
  },
  methods: {
    togglePopup(str) {
      //this.$emit(`toggle-${str}`);
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
    },
    toggleGeneralPopup(ev, str) {
      const targetRect = ev.target.getBoundingClientRect();
      const buttonLeftPos = targetRect.left
      this.$emit("toggle-popup", {str, buttonLeftPos});
    },
    assignTaskMember(member) {
      this.$emit("assign-task-member", member);
    },
    removeTaskMember(id){
      this.$emit("remove-task-member", id);
    },
    setChecklist(checklist) {
      this.$emit("set-checklist", checklist);
      this.togglePopup("Checklist")
    },
    setTaskLabels(labelIds) {
      this.$emit("set-task-labels", labelIds);
    },
    saveAttachments(attachments) {
      this.$emit("save-attachments", attachments);
      this.togglePopup("Attachment");
    },
  },
  components: {
    popupMember,
    popupChecklist,
    popupAttachment,
  },
};
</script>
