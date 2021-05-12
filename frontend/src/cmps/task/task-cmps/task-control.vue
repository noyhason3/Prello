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
      @remove-cover="removeCover"
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
      @remove-task-member="removeTaskMember"
      @assign-task-member="assignTaskMember"
      @blur.native="memberBlurHandler"
    ></popup-member>
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
      :taskDuedate="task.duedate"
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
            const popupRect = popup.getBoundingClientRect();
            const popupHeight = popupRect.height;
            const popupWidth = popupRect.width;

            if (left + popupWidth > window.innerWidth) {
              popup.style.left = left - targetRect.width + "px";
            } else popup.style.left = left + "px";

            if (popupHeight + top > window.innerHeight) {
              console.log("Place popup above button");
              popup.style.bottom = window.innerHeight - targetRect.top + "px";
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
          classList.includes("label-color") ||
          classList.includes("create-label")
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
        if (classList.includes("duedate-submit") || classList.includes("date"))
          ev.relatedTarget.focus();
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
    setChecklist(checklist) {
      const task = this.task;
      checklist.id = utilService.makeId();
      task.checklists.push(checklist);
      this.saveTask({
        task,
        activityType: `${this.user.fullname}, added a checklist to card: '${this.task.title}'`,
      });
      this.togglePopup("Checklist");
    },
    async saveTask({ task, activityType }) {
      await this.$store.dispatch({ type: "saveTask", task, activityType });
    },
    setCoverColor(color) {
      this.task.style.coverImg = "";
      this.task.style.coverColor = color;
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, changed the cover-color on card: '${this.task.title}' `,
      });
    },
    saveCoverImg(img) {
      this.task.style.coverColor = "";
      this.task.style.coverImg = img.url;
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, changed the cover-image on card: '${this.task.title}' `,
      });
    },
    removeCover() {
      this.task.style.coverImg = "";
      this.task.style.coverColor = "";
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, removed the cover on card: '${this.task.title}' `,
      });
    },
    assignTaskMember(member) {
      if (!this.task.members) this.task.members = [];
      this.task.members.push(member);
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, assigned ${member.fullname} to card: '${this.task.title}' `,
      });
    },
    removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      const deletedMember = this.task.members.splice(memberIdx, 1);
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, removed ${deletedMember[0].fullname} from card: '${this.task.title}'`,
      });
    },
    saveChecklist(checklist) {
      const task = this.task;
      this.checklist.id = utilService.makeId();
      task.checklists.push(checklist);
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, added a checklist on card: '${this.task.title}'`,
      });
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, modified labels on card: '${this.task.title}'`,
      });
    },
    // saveDate(timestamp) {
    saveDate(duedate) {
      // this.task.duedate = timestamp;
      this.task.duedate = duedate;
      this.togglePopup("Duedate");
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, modified the date to card: '${this.task.title}'`,
      });
    },
    saveAttachments(attachments) {
      this.task.attachments = attachments;
      console.log(attachments);
      this.saveTask(this.task);
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, modified the attachments on card: '${this.task.title}`,
      });
    },
    async removeTask() {
      await this.$store.dispatch({
        type: "removeTask",
        taskId: this.task.id,
        activityType: `${this.user.fullname}, deleted the card: '${this.task.title}`,
      });
      const taskId = this.$route.params.taskId;
      const boardId = this.$route.params.boardId;
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
