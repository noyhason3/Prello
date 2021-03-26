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
      @toggle-popup="togglePopup"
      @set-cover-color="setCoverColor"
      @save-cover-img="saveCoverImg"
      tabindex="0"
      @blur.native="togglePopup('Cover')"
      ref="Cover"
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
      tabindex="0"
      ref="Member"
    ></popup-member>
    <!-- @blur.native="togglePopup('Member')" -->
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
      tabindex="0"
      @blur.native="togglePopup('Duedate')"
      ref="Duedate"
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
      tabindex="0"
      @blur.native="togglePopup('Checklist')"
      ref="Checklist"
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
      tabindex="0"
      ref="Label"
    >
      <!-- @blur.native="togglePopup('Label')" -->
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
      tabindex="0"
      @blur.native="togglePopup('Attachment')"
      ref="Attachment"
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
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
      if (ev) {
        const targetRect = ev.target.getBoundingClientRect();
        var maxHeight = window.innerHeight - targetRect.bottom - 20;
        const top = targetRect.bottom + 3;
        const left = targetRect.left;
        this.$nextTick(() => {
          const popup = this.$refs[str].$el;
          const popupHeight = popup.getBoundingClientRect().height;
          if (popup) {
            popup.style.left = left + "px";

            if (popupHeight + top > window.innerHeight) {
              console.log("Place popup above button");
              popup.style.bottom = window.innerHeight - targetRect.top + "px";
              popup.style.maxHeight = targetRect.top - 15 + "px";
            } else {
              popup.style.top = top + "px";
              popup.style.maxHeight = maxHeight + "px";
            }

            // console.log(
            //   "file: task-control.vue - line 160 - this.$nextTick - window.innerHeight",
            //   window.innerHeight
            // );
            // console.log(
            //   "file: task-control.vue - line 160 - this.$nextTick - popup.style.height + top",
            //   maxHeight + top
            // );

            popup.focus();
          }
        });
      }
    },
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
