<template>
  <section class="task-preview" v-if="task">
    <div
      v-if="menuOpen"
      class="task-control-screen"
      @click.stop="menuOpen = false"
    >
      <taskControl :task="task" ref="taskControl" tabindex="0"></taskControl>
    </div>
    <!-- @toggle-popup="togglePopup"
        @set-cover-color="setCoverColor"
        @save-cover-img="saveCoverImg"
        @assign-task-member="assignTaskMember"
        @remove-task-member="removeTaskMember"
        @set-checklist="saveChecklist"
        @set-task-labels="setTaskLabels"
        @save-date="saveDate"
        @save-attachments="saveAttachments" -->

    <header style="position: relative">
      <div
        v-if="task.style.coverColor"
        class="task-cover-preview"
        :style="`background-color: ${task.style.coverColor}`"
      />
      <img
        v-if="task.style.coverImg"
        class="task-cover-img-preview"
        :src="task.style.coverImg"
      />

      <button
        @click.stop="openControls"
        class="btn edit icon pencil preview"
      ></button>
    </header>

    <div class="task-preview-main">
      <task-label-preview
        v-if="taskLabelIds"
        :taskLabelIds="taskLabelIds"
        class="task-label-preview"
      />
      <div>
        <h2 class="task-title">{{ task.title }}</h2>
        <!-- TODO: <div class="btn task-edit">
        <span>🖊</span>
      </div> -->
      </div>
      <div class="task-info-preview">
        <div class="main-info-task-preview">
          <div
            v-if="task.duedate && task.duedate.date"
            @click.stop="markDateComplete"
            class="task-duedate-preview"
            :class="status"
          >
            <span class="icon clock preview" />
            {{ date.day }}
          </div>

          <div v-if="isTaskDescription" class="icon description preview"></div>
          <div v-if="attachmentCount" class="attachment-info">
            <span class="icon attachment preview"></span>{{ attachmentCount }}
          </div>

          <div v-if="taskChecklists" class="checklist-info">
            <span class="icon checklist preview"></span
            >{{ taskChecklists.complete }}/{{ taskChecklists.total }}
          </div>
        </div>

        <div class="members-task-preview">
          <member-list
            v-if="taskMemebers"
            :members="taskMemebers"
            :isTaskRelated="true"
            @remove-task-member="removeTaskMember"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import memberList from "@/cmps/common/member-list.vue";
import taskLabelPreview from "@/cmps/task/task-cmps/task-label-preview.vue";
import editableTitle from "@/cmps/common/editable-text.vue";
import moment from "moment";
import taskControl from "@/cmps/task/task-cmps/task-control.vue";

export default {
  props: {
    task: Object,
  },
  data() {
    return {
      menuOpen: false,
      isEditing: false,
    };
  },
  methods: {
    removeTask(ev) {
      ev.stopPropagation();
      this.$emit("remove-task", this.task.id);
    },
    async removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      const task = JSON.parse(JSON.stringify(this.task));
      task.members.splice(memberIdx, 1);
      await this.$store.dispatch({ type: "saveTask", task });
    },
    openControls(ev) {
      this.menuOpen = !this.menuOpen;
      this.$nextTick(() => {
        const targetRect = ev.target.getBoundingClientRect();
        const elControl = this.$refs.taskControl?.$el;
        if (elControl) {
          const elHeight = elControl.getBoundingClientRect().height;
          if (targetRect.bottom + elHeight < window.innerHeight) {
            elControl.style.top = targetRect.bottom + "px";
          } else {
            elControl.style.top = targetRect.top - elHeight + "px";
          }
          elControl.style.left = targetRect.right + "px";
          elControl.focus();
        }
      });
    },
    controlBlurHandler(ev) {
      if (Array.from(ev.target.classList).includes("task-control")) {
        ev.target.focus();
      } else this.menuOpen = false;
    },
    async markDateComplete() {
      const task = JSON.parse(JSON.stringify(this.task));
      task.duedate.isComplete = !task.duedate.isComplete;
      await this.$store.dispatch({ type: "saveTask", task });
    },
  },
  computed: {
    //TODO:// isTaskCover() {
    //   return this.task.style.coverColor;
    // },
    isTaskDescription() {
      return this.task.description;
    },
    attachmentCount() {
      return this.task.attachment?.length;
    },
    date() {
      // const timestamp = this.task.duedate;
      const duedate = new Date(parseInt(this.task.duedate.date));
      const day = moment(duedate).format("MMM D");
      // const day = moment.unix(timestamp).format("MMM D");
      // const hour = moment.unix(timestamp).format("hh:mm A");
      const date = {
        day,
        // hour,
      };
      return date;
    },
    status(){
       if(this.task.duedate.isComplete) return 'complete';
      if(parseInt(this.task.duedate.date) - Date.now() < 0) return 'overdue';
      return null;
    },
    // isTaskDuedate() {
    //   return this.task.duedate;
    // },
    taskMemebers() {
      if (!this.task.members?.length) return false;
      return this.task.members;
    },
    taskLabelIds() {
      if (!this.task.labelIds?.length) return false;
      return this.task.labelIds;
    },
    taskChecklists() {
      if (!this.task.checklists) return;
      const todosTotals = this.task.checklists.reduce(
        (acc, checklist) => {
          acc.complete += checklist.todos.filter((todo) => todo.isDone).length;
          acc.total += checklist.todos.length;
          return acc;
        },
        { total: 0, complete: 0 }
      );
      if (!todosTotals.total) return;
      return todosTotals;
    },
    attachmentCount() {
      return this.task.attachments.length;
    },
  },
  components: {
    taskLabelPreview,
    memberList,
    taskControl,
  },
};
</script>

