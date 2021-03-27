<template>
  <section class="task-control" @click.stop>
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
      :task="task"
      tabindex="0"
      ref="Member"
      @blur.native="togglePopup('Member')"
    ></popup-member>
    <!-- <button>Labels</button> -->
    <button
      @click="togglePopup('Duedate', $event)"
      @blur="togglePopup('Duedate', $event)"
      class="btn neutral left-align"
    >
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
      ref="Checklist"
      @blur.native="checklistBlurHandler"
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
      :task="task"
      @blur.native="labelBlurHandler"
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
      :attachments="task.attachments"
      tabindex="0"
      ref="Attachment"
    />
    <!-- @blur.native="attachmentBlurHandler" -->
  </section>
</template>

<script>
import utilService from "@/services/util.service";

import popupCover from "@/cmps/task/popup/popup-cover.vue";
import popupMember from "@/cmps/task/popup/popup-member";
import popupChecklist from "@/cmps/task/popup/popup-checklist.vue";
import popupAttachment from "@/cmps/task/popup/popup-attachment.vue";
import popupDuedate from "@/cmps/task/popup/popup-duedate.vue";
import popupLabel from "@/cmps/task/popup/popup-label.vue";

export default {
  props: {
    task: Object,
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
          const popup = this.$refs[str]?.$el;
          if (popup) {
            const popupHeight = popup.getBoundingClientRect().height;
            popup.style.left = left + "px";

            if (popupHeight + top > window.innerHeight) {
              console.log("Place popup above button");
              popup.style.bottom = window.innerHeight - targetRect.top + "px";
              popup.style.maxHeight = targetRect.top - 15 + "px";
            } else {
              popup.style.top = top + "px";
              popup.style.maxHeight = maxHeight + "px";
            }
            popup.focus();
          }
        });
      }
    },
    checklistBlurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (
          classList.includes("popup-checklist") ||
          classList.includes("checklist-title") ||
          classList.includes("checklist-add")
        )
          ev.relatedTarget.focus();
        else {
          this.togglePopup("Checklist");
        }
      } else this.togglePopup("Checklist");
    },
    attachmentBlurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (
          classList.includes("url-input") ||
          classList.includes("attachment-add")
        )
          ev.relatedTarget.focus();
        else {
          this.togglePopup("Attachment");
        }
      } else this.togglePopup("Attachment");
    },
    labelBlurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (
          classList.includes("edit-label") ||
          classList.includes("search-label") ||
          classList.includes("label-color")
        )
          ev.relatedTarget.focus();
        else {
          this.togglePopup("Label");
        }
      } else this.togglePopup("Label");
    },
    // setCoverColor(color) {
    //   this.$emit("set-cover-color", color);
    // },
    // saveCoverImg(img) {
    //   this.$emit("save-cover-img", img);
    //   this.togglePopup("Cover");
    // },
    // assignTaskMember(member) {
    //   this.$emit("assign-task-member", member);
    // },
    // removeTaskMember(id) {
    //   this.$emit("remove-task-member", id);
    // },
    setChecklist(checklist) {
      console.log(
        "file: task-control.vue - line 200 - setChecklist - checklist",
        checklist
      );
      const task = this.task;
      checklist.id = utilService.makeId();
      task.checklists.push(checklist);
      this.saveTask(task);
      this.togglePopup("Checklist");
    },
    // setTaskLabels(labelIds) {
    //   this.$emit("set-task-labels", labelIds);
    // },
    // saveDate(timestamp) {
    //   this.$emit("save-date", timestamp);
    //   this.togglePopup("Duedate");
    // },
    // saveAttachments(attachments) {
    //   this.$emit("save-attachments", attachments);
    //   this.togglePopup("Attachment");
    // },
    async saveTask(task) {
      await this.$store.dispatch({ type: "saveTask", task });
    },
    // togglePopup({ str }) {
    //   var dataStr = `is${str}Open`;
    //   this[dataStr] = !this[dataStr];
    // },
    setCoverColor(color) {
      this.task.style.coverImg = "";
      this.task.style.coverColor = color;
      this.saveTask(this.task);
    },
    saveCoverImg(img) {
      this.task.style.coverColor = "";
      this.task.style.coverImg = img.url;
      this.saveTask(this.task);
    },
    assignTaskMember(member) {
      console.log(
        "file: task-control.vue - line 232 - assignTaskMember - this.task",
        this.task
      );
      if (!this.task.members) this.task.members = [];
      this.task.members.push(member);
      this.saveTask(this.task);
    },
    removeTaskMember(id) {
      console.log("memberIdx:");
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      this.task.members.splice(memberIdx, 1);
      this.saveTask(this.task);
    },
    saveChecklist(checklist) {
      const task = this.task;
      this.checklist.id = utilService.makeId();
      task.checklists.push(checklist);
      this.saveTask(task);
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask(this.task);
    },
    saveDate(timestamp) {
      this.task.duedate = timestamp;
      this.saveTask(this.task);
    },
    saveAttachments(attachments) {
      this.task.attachments = attachments;
      console.log(attachments);
      this.saveTask(this.task);
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
