<template>
  <section class="task-control">
    <!--  ******TODO********
      <button>Join</button> -->
    <!-- <button @click="togglePopup('Cover')" class="control-btn cover"><span></span>Cover</button> -->
    <button
      @click="togglePopup('Cover', $event)"
      class="btn neutral left-align"
    >
      <!-- @blur="togglePopup('Cover', $event)" -->
      <span class="icon cover"></span>Cover
    </button>
    <popup-cover
      v-if="isCoverOpen"
      @close-popup="isCoverOpen = false"
      @toggle-popup="togglePopup"
      @set-cover-color="setCoverColor"
      @save-cover-img="saveCoverImg"
    />

    <h6 class="add-to-card">ADD TO CARD</h6>
    <button
      @click="togglePopup('Member', $event)"
      class="btn neutral left-align"
    >
      <!-- @blur="togglePopup('Member', $event)" -->
      <span class="icon member"></span>Members
    </button>
    <popup-member
      v-if="isMemberOpen"
      @close-popup="isMemberOpen = false"
      @assign-task-member="assignTaskMember"
      @toggle-popup="togglePopup"
      @remove-task-member="removeTaskMember"
    ></popup-member>
    <!-- <button>Labels</button> -->
    <button
      @click="togglePopup('Duedate', $event)"
      class="btn neutral left-align"
    >
      <!-- @blur="togglePopup('Duedate', $event)" -->
      <span class="icon clock"></span>Due date
    </button>
    <popup-duedate
      v-if="isDuedateOpen"
      @toggle-popup="togglePopup"
      @save-date="saveDate"
    />

    <button
      @click="togglePopup('Checklist', $event)"
      class="btn neutral left-align"
    >
      <!-- @blur="togglePopup('Checklist', $event)" -->
      <span class="icon checklist"></span>Checklist
    </button>
    <popup-checklist
      v-if="isChecklistOpen"
      @add-checklist="setChecklist"
      @toggle-popup="togglePopup"
    />

    <button
      @click="togglePopup('Label', $event)"
      class="btn neutral left-align"
    >
      <!-- @blur="togglePopup('Label', $event)" -->
      <!-- @click="toggleGeneralPopup($event, 'Label')" -->
      <span class="icon label"></span>Labels
    </button>
    <popup-label
      v-if="isLabelOpen"
      @set-task-labels="setTaskLabels"
      @toggle-popup="togglePopup"
    >
    </popup-label>

    <!-- <button>Due date</button> -->
    <!-- <button @click="togglePopup('Duedate')" class="btn neutral left-align">
      <span class="icon clock"></span>Due date
    </button>
    <popup-duedate
      v-if="isDuedateOpen"
      @toggle-popup="togglePopup"
      @save-date="saveDate"
    /> -->

    <button
      @click="togglePopup('Attachment', $event)"
      class="btn neutral left-align"
    >
      <span class="icon attachment"></span>Attachement
    </button>
    <popup-attachment
      v-if="isAttachmentOpen"
      @save-attachments="saveAttachments"
      @toggle-popup="togglePopup"
      :attachments="attachments"
    />
  </section>
</template>

<script>
import popupCover from "@/cmps/task/popup/popup-cover.vue";
import popupMember from "@/cmps/task/popup/popup-member";
import popupChecklist from "@/cmps/task/popup/popup-checklist.vue";
import popupAttachment from "@/cmps/task/popup/popup-attachment.vue";
import popupDuedate from "@/cmps/task/popup/popup-duedate.vue";
import popupLabel from "@/cmps/task/popup/popup-label.vue";

export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      isCoverOpen: false,
      isMemberOpen: false,
      isLabelOpen: false,
      isChecklistOpen: false,
      isAttachmentOpen: false,
      isDuedateOpen: false,
    };
  },
  methods: {
    togglePopup(str, ev) {
      console.log("file: task-control.vue - line 128 - togglePopup - str", str);
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
      if (ev) {
        const targetRect = ev.target.getBoundingClientRect();
        const maxHeight = window.innerHeight - targetRect.bottom - 5;
        const top = targetRect.bottom + 3;
        const left = targetRect.left;
        this.$nextTick(() => {
          const selector = ".popup-" + str.toLowerCase();
          const popup = document.querySelector(selector);
          if (popup) {
            popup.style.left = left + "px";
            popup.style.top = top + "px";
            popup.style.maxHeight = maxHeight + "px";
          }
        });
      }
    },
    // toggleGeneralPopup(ev, str) {
    //   const targetRect = ev.target.getBoundingClientRect();
    //   console.log(
    //     "file: task-control.vue - line 104 - toggleGeneralPopup - targetRect",
    //     targetRect
    //   );
    //   const buttonLeftPos = targetRect.left;
    //   const buttonBottomPos = targetRect.bottom;
    //   this.$emit("toggle-popup", { str, buttonLeftPos, buttonBottomPos });
    // },
    setCoverColor(color) {
      this.$emit("set-cover-color", color);
    },
    saveCoverImg(img) {
      this.$emit("save-cover-img", img);
      this.togglePopup("Cover");
    },
    assignTaskMember(member) {
      this.$emit("assign-task-member", member);
    },
    removeTaskMember(id) {
      this.$emit("remove-task-member", id);
    },
    setChecklist(checklist) {
      this.$emit("set-checklist", checklist);
      this.togglePopup("Checklist");
    },
    setTaskLabels(labelIds) {
      this.$emit("set-task-labels", labelIds);
    },
    saveDate(timestamp) {
      this.$emit("save-date", timestamp);
      this.togglePopup("Duedate");
    },
    saveAttachments(attachments) {
      this.$emit("save-attachments", attachments);
      this.togglePopup("Attachment");
    },
  },
  components: {
    popupCover,
    popupMember,
    popupChecklist,
    popupAttachment,
    popupDuedate,
    popupLabel,
  },
};
</script>
