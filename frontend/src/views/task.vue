<template>
  <section
    class="task"
    v-if="task"
    @dragover.prevent="dragOver"
    @dragleave="isDragOver = false"
  >
    <button @click="closeTask()" class="btn close">X</button>
    <!-- <pre>{{ task }}</pre> -->
    <popup-label
      v-if="isLabelOpen"
      @set-task-labels="setTaskLabels"
      @toggle-popup="togglePopup"
    >
    </popup-label>
    <task-control
      @assign-member="assignMember"
      @set-checklist="saveChecklist"
      @set-task-labels="setTaskLabels"
      @toggle-popup="togglePopup"
    />
    <!-- <task-cover /> -->
    <div class="task-main">
      <task-title v-model="task.title" />

      <h6 contenteditable="true">In list: {{ this.task.group.title }}</h6>

      <!-- :taskTitle="task.title"  @setTitle="setTitle" -->
      <div v-if="task" class="task-info">
        <member-list :members="task.members" />

        <task-label
          :taskLabelIds="task.labelIds"
          @set-task-labels="setTaskLabels"
          @openLabelPopup="openLabelPopup"
        />
        <!-- <task-duedate /> -->
      </div>

      <h4>Description</h4>
      <editable-text v-model="task.description" :type="'description'" />

      <!-- :currTaskDescription="task.description"
      :task="task"
      @setDescription="setDescription" -->
      <task-attachment :attachments="attachments" />
      <file-drag-uploader
        v-if="isDragOver"
        @save-attachments="saveAttachments"
        class="drag-uploader"
      />

      <ul class="clean-list">
        <draggable
          v-model="task.checklists"
          group="checklists"
          @start="drag = true"
          @end="drag = false"
          animation="150"
          empty-insert-threshold="50"
          ghost-class="ghost"
          chosen-class="chosen"
          drag-class="drag"
          draggable=".checklist-container"
        >
          <li
            v-for="checklist in task.checklists"
            :key="checklist.id"
            class="checklist-container"
          >
            <task-checklist
              :checklist="checklist"
              @save-todo="saveTodo"
              @delete-checklist="deleteChecklist"
            />
          </li>
        </draggable>
      </ul>
    </div>
    <!-- <task-comment /> -->
    <!-- <activity-list /> -->
  </section>
</template>

<script>
import draggable from "vuedraggable";
import taskControl from "@/cmps/task/task-cmps/task-control.vue";
import taskTitle from "@/cmps/common/editable-title.vue";
import editableText from "@/cmps/task/task-cmps/editable-text.vue";
import memberList from "@/cmps/common/member-list.vue";
import taskChecklist from "@/cmps/task/task-cmps/task-checklist.vue";
import taskLabel from "@/cmps/task/task-cmps/task-label.vue";
import popupLabel from "@/cmps/task/popup/popup-label.vue";
import taskAttachment from "@/cmps/task/task-cmps/task-attachment.vue";
import fileDragUploader from "@/cmps/common/file-drag-uploader.vue";

export default {
  data() {
    return {
      isLabelOpen: false,
      // ghostRect: null,
      isDragOver: false,
      // attachments: null,
    };
  },
  computed: {
    taskId() {
      return this.$route.parmas.taskId;
    },
    task() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask)); //Should we copy the task here? not inside methods.
    },
    attachments() {
      console.log("loading attachments");
      return this.task.attachments;
    },
  },

  methods: {
    setTitle(title) {
      this.task.title = title;
    },
    setDescription(description) {
      this.task.description = description;
    },
    assignMember(member) {
      var task = this.task;
      if (!task.members) task.members = [];
      if (
        task.members.some((assignedMember) => assignedMember._id === member._id)
      ) {
        // throw new Error('User already assigned to task')
        console.log("User already assigned to task");
        return;
      }
      task.members.push(member);
      this.saveTask(task);
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask(this.task);
    },

    // TODO - MAYBE WE CAN MERGE THESE TWO TO ONE FUNCTION??

    saveChecklist(checklist) {
      const task = this.task;
      if (!task.checklists.todos) task.checklists = [];
      task.checklists.push(checklist);
      this.saveTask(task);
    },
    deleteChecklist(checklistId) {
      const idx = this.task.checklists.findIndex(
        ({ id }) => id === checklistId
      );
      this.task.checklists.splice(idx, 1);
      this.saveTask(this.task);
    },
    saveTodo(checklist) {
      const idx = this.task.checklists.findIndex(
        ({ id }) => id === checklist.id
      );
      this.task.checklists.splice(idx, 1, checklist);
      this.saveTask(this.task);
    },
    saveTask(task) {
      this.$store.commit({ type: "saveTask", task });
    },
    togglePopup(str) {
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
      console.log(this.isLabelOpen);
    },
    openLabelPopup() {
      this.isLabelOpen = true;
    },
    saveAttachments(attachment) {
      this.task.attachments.push(attachment);
      this.saveTask(this.task);
      // this.attachments = this.task.attachments;
      console.log("task atts", this.task.attachments);
    },
     dragOver(ev) {
      this.isDragOver = true;
      console.log(this.isDragOver);
    },
  },
  components: {
    draggable,
    taskControl,
    taskTitle,
    memberList,
    taskChecklist,
    editableText,
    taskLabel,
    popupLabel,
    taskAttachment,
    fileDragUploader,
  },
};
</script>

<style>
</style>