<template>
  <section class="task-control" @click.stop>
    <!--  ******TODO********
      <button>Join</button> -->
    <!-- <button @click="togglePopup('Cover')" class="control-btn cover"><span></span>Cover</button> -->
    <button
      @click="togglePopup('Cover', $event)"
      class="btn neutral left-align cover"
    >
      <!-- @blur="togglePopup('Cover', $event)" -->
      <span class="icon cover"></span>Cover
    </button>
    <popup-cover
      v-if="isCoverOpen"
      @toggle-popup="togglePopup"
      @set-cover-color="setCoverColor"
      @save-cover-img="saveCoverImg"
      @delete-cover="deleteCover"
      tabindex="0"
      ref="Cover"
      @blur.native="coverBlurHandler"
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
      :task="task"
      tabindex="0"
      ref="Member"
      @toggle-popup="isMemberOpen = false"
    ></popup-member>
    <!-- @blur.native="memberBlurHandler" -->
    <!-- <button>Labels</button> -->
    <button
      @click="togglePopup('Duedate', $event)"
      class="btn neutral left-align"
    >
      <span class="icon clock"></span>Due date
    </button>
    <popup-duedate
      v-if="isDuedateOpen"
      @toggle-popup="togglePopup"
      @save-date="saveDate"
      tabindex="0"
      ref="Duedate"
      @blur.native="duedateBlurHandler"
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
      @blur.native="attachmentBlurHandler"
    />

    <button class="btn neutral left-align" @click="removeTask">
      <span class="icon archive" />
      Archive
    </button>
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
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
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
              console.log(
                "file: task-control.vue - line 171 - this.$nextTick - targetRect.top",
                targetRect.top
              );
              popup.style.maxHeight = targetRect.top + "px";
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
    coverBlurHandler(ev) {
      if (Array.from(document.activeElement.classList).includes("popup")) {
        this.togglePopup("Cover");
        ev.target.focus();
      }
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (
          classList.includes("cover-upload-input") ||
          classList.includes("popup")
        )
          ev.relatedTarget.focus();
        else {
          this.togglePopup("Cover");
        }
      } else this.togglePopup("Cover");
    },
    attachmentBlurHandler(ev) {
      if (Array.from(document.activeElement.classList).includes("popup")) {
        this.togglePopup("Attachment");
        ev.target.focus();
      }
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
    duedateBlurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (classList.includes("duedate-submit")) ev.relatedTarget.focus();
        else {
          this.togglePopup("Duedate");
        }
      } else this.togglePopup("Duedate");
    },
    memberBlurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (classList.includes("search-member")) ev.relatedTarget.focus();
        else {
          this.togglePopup("Member");
        }
      } else this.togglePopup("Member");
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
    async saveTask({ task, activityType }) {
      await this.$store.dispatch({ type: "saveTask", task, activityType });
    },
    // togglePopup({ str }) {
    //   var dataStr = `is${str}Open`;
    //   this[dataStr] = !this[dataStr];
    // },
    setCoverColor(color) {
      this.task.style.coverImg = "";
      this.task.style.coverColor = color;
      this.saveTask({
        task: this.task,
        activityType: `Cover-color was set on task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    saveCoverImg(img) {
      this.task.style.coverColor = "";
      this.task.style.coverImg = img.url;
      this.saveTask({
        task: this.task,
        activityType: `Cover-image was set on task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    deleteCover() {
      this.task.style.coverImg = "";
      this.task.style.coverColor = "";
       this.saveTask({
        task: this.task,
        activityType: `Cover on task: '${this.task.title}' was removed by: ${this.user.fullname}`,
      });
    },
    assignTaskMember(member) {
      if (!this.task.members) this.task.members = [];
      this.task.members.push(member);
      this.saveTask({
        task: this.task,
        activityType: `${member.fullname} was assigned to task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      const deletedMember = this.task.members.splice(memberIdx, 1);
      this.saveTask({
        task: this.task,
        activityType: `${deletedMember[0].fullname} was removed from task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    saveChecklist(checklist) {
      const task = this.task;
      this.checklist.id = utilService.makeId();
      task.checklists.push(checklist);
      this.saveTask({
        task: this.task,
        activityType: `Checklist was set on task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask({
        task: this.task,
        activityType: `Task '${this.task.title}'s' labels were set by: ${this.user.fullname}`,
      });
    },
    saveDate(timestamp) {
      this.task.duedate = timestamp;
      this.togglePopup("Duedate");
      this.saveTask(this.task);
      this.saveTask({
        task: this.task,
        activityType: `Date was set on task: '${this.task.title}' by: ${this.user.fullname}`,
      });
    },
    saveAttachments(attachments) {
      this.task.attachments = attachments;
      console.log(attachments);
      this.saveTask(this.task);
      this.saveTask({
        task: this.task,
        activityType: `Task '${this.task.title}'s' attachments were set by: ${this.user.fullname}`,
      });
    },
    async removeTask() {
      await this.$store.dispatch({
        type: "removeTask",
        taskId: this.task.id,
        activityType: `Task '${this.task.title} was deleted by: ${this.user.fullname}`,
      });
      const taskId = this.$route.params.taskId;
      const boardId = this.$route.params.boardId;
      console.log(
        "file: task-control.vue - line 307 - removeTask - taskId",
        this.task
      );
      if (taskId) {
        this.$router.push("/board/" + boardId);
      }
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
