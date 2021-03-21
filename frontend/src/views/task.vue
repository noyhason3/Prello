<template>
  <section
    class="task"
    v-if="task"
    @dragover.prevent="dragOver"
    @click.prevent="closeTask"
  >
    <div class="task-container" @click.stop :style="`top:${initialHeight}px;`">
      <div class="header">
        <button @click.stop="closeTask" class="btn close">X</button>
        <task-title v-model="task.title" />
        <h6 v-if="groupTitle">In list: {{ groupTitle }}</h6>
      </div>
      <div class="task-content" @click.stop>
        <!-- <pre>{{ task.attachments }}</pre> -->
        <popup-label
          v-if="isLabelOpen"
          :popupLeftPos="popupLeftPos"
          @set-task-labels="setTaskLabels"
          @toggle-popup="togglePopup"
        >
        </popup-label>
        <task-control
          @assign-task-member="assignTaskMember"
          @remove-task-member="removeTaskMember"
          @set-checklist="saveChecklist"
          @set-task-labels="setTaskLabels"
          @toggle-popup="togglePopup"
          @save-attachments="saveAttachments"
          :attachments="attachments"
        />
        <!-- <task-cover /> -->

        <div class="task-main">
          <!-- <task-title v-model="task.title" />

          <h6 v-if="groupTitle">In list: {{ groupTitle }}</h6> -->

          <div v-if="task" class="task-info">
            <member-list
              :members="task.members"
              :isTaskRelated="true"
              @remove-task-member="removeTaskMember"
            />

            <task-label
              :taskLabelIds="task.labelIds"
              @set-task-labels="setTaskLabels"
              @open-label-popup="openLabelPopup"
            />
            <!-- <task-duedate /> -->
          </div>

          <h4>📄 Description</h4>
          <editable-text
            v-model="task.description"
            :type="'description'"
            :elementType="'task'"
            @input="setDescription"
            class="task-description-content"
          />

          <task-attachment
            v-if="attachments.length"
            :attachments="attachments"
            @save-attachments="saveAttachments"
          />
          <file-drag-uploader
            v-if="isDragOver"
            :isDragOver="isDragOver"
            :attachments="attachments"
            @save-attachments="saveAttachments"
            @not-drag-over="notDragOver"
            class="drag-uploader"
          />

          <!-- <ul class="clean-list"> -->
          <draggable
            v-model="task.checklists"
            group="checklists"
            @start="drag = true"
            @end="
              drag = false;
              saveTask(task);
            "
            :move="move"
            animation="150"
            empty-insert-threshold="50"
            draggable=".checklist-container"
            tag="ul"
            class="clean-list"
          >
            <!-- :progressPercentage="progressPercentage(checklist)" -->
            <task-checklist
              v-for="checklist in task.checklists"
              :key="checklist.id"
              class="checklist-container"
              :checklist="checklist"
              @save-todo="saveTodo"
              @delete-checklist="deleteChecklist"
              @toggle-drag="toggleDrag"
              @update-task="saveTask(task)"
            />
            <!-- {{ checklist.id }} -->
          </draggable>
          <!-- </ul> -->
        </div>
        <!-- <task-comment /> -->
        <!-- <activity-list /> -->
      </div>
    </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import taskControl from "@/cmps/task/task-cmps/task-control.vue";
import taskTitle from "@/cmps/common/editable-title.vue";
import editableText from "@/cmps/common/editable-text.vue";
import memberList from "@/cmps/common/member-list.vue";
import taskChecklist from "@/cmps/task/task-cmps/task-checklist.vue";
import taskLabel from "@/cmps/task/task-cmps/task-label.vue";
import popupLabel from "@/cmps/task/popup/popup-label.vue";
import taskAttachment from "@/cmps/task/task-cmps/task-attachment.vue";
import fileDragUploader from "@/cmps/common/file-drag-uploader.vue";
import boardService from "../services/board.service";

export default {
  data() {
    return {
      isLabelOpen: false,
      isDragOver: false,
      drag: false,
      popupLeftPos: null,
      groupTitle: null,
      initialHeight: null,
      // task: null,
    };
  },
  async created() {
    await this.group();
    //   this.loadTask();
    const body = document.querySelector(".main").getBoundingClientRect();
    this.initialHeight = body.top + 5;
  },
  computed: {
    // taskId() {
    //   return this.$router.parmas.taskId;
    // },
    task() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask)); //Should we copy the task here? not inside methods.
    },
    attachments() {
      return this.task.attachments;
    },
    // id() {
    //   return this.$route.params.taskId;
    // },
    // boardId() {
    //   return this.$route.params.boardId;
    // },
  },
  methods: {
    // progressPercentage(checklist) {
    //   if (!checklist.todos.length) return 0;
    //   const doneTodos = checklist.todos.filter((todo) => todo.isDone);
    //   const progress = Math.floor(
    //     (doneTodos.length / checklist.todos.length) * 100
    //   );
    //   return progress;
    // },
    async group() {
      const group = await this.$store.dispatch({ type: "getGroup" });
      this.groupTitle = group.title;
    },
    move(ev) {
      console.log("file: task.vue - line 142 - move - ev", ev);
    },
    reorder(ev) {
      console.log("file: task.vue - line 151 - reorder - ev", ev);
    },
    // setTitle(title) {
    //   this.task.title = title;
    // },
    // async loadTask() {
    //   this.task = await boardService.getTask({
    //     board: this.$store.getters.currBoard,
    //     taskId: this.id,
    //   });
    //   console.log(
    //     "file: task.vue - line 138 - loadTask - this.task",
    //     this.task
    //   );
    // },
    setDescription() {
      this.saveTask(this.task);
    },
    assignTaskMember(member) {
      if (!this.task.members) this.task.members = [];

      // if (
      //   task.members.some((assignedMember) => assignedMember._id === member._id)
      // ) {
      //   // throw new Error('User already assigned to task')
      //   console.log("User already assigned to task");
      //   return;
      // }
      this.task.members.push(member);
      this.saveTask(this.task);
    },
    removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      this.task.members.splice(memberIdx, 1);
      this.$store.commit({ type: "saveTask", task });
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask(this.task);
    },

    // TODO - MAYBE WE CAN MERGE THESE TWO TO ONE FUNCTION??

    saveChecklist(checklist) {
      const task = this.task;
      // if (!task.checklists.todos) task.checklists = [];
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
      console.log("file: task.vue - line 165 - saveTask - task", task);
      this.$store.commit({ type: "saveTask", task });
    },
    closeTask() {
      const boardId = this.$route.params.boardId;
      this.$router.push("/board/" + boardId);
    },
    togglePopup({ str, buttonLeftPos }) {
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
      if (!this[dataStr]) this.popupLeftPos = 0;
      else this.popupLeftPos = buttonLeftPos;
      console.log("buttonLeftPos:", this.popupLeftPos);
    },
    openLabelPopup(buttonLeftPos) {
      this.popupLeftPos = buttonLeftPos;
      this.isLabelOpen = true;
    },
    saveAttachments(attachments) {
      this.task.attachments = attachments;
      console.log(attachments);
      this.saveTask(this.task);
    },
    dragOver(ev) {
      if (this.drag) return;
      this.isDragOver = true;
    },
    notDragOver() {
      this.isDragOver = false;
    },
    toggleDrag(isDrag) {
      this.drag = isDrag;
    },
    setDrag(isDrag) {
      this.dragTodo = isDrag;
      this.$emit("toggle-drag", isDrag);
    },
    removeTaskMember(id) {
      console.log("memberIdx:");
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      this.task.members.splice(memberIdx, 1);
      this.saveTask(this.task);
    },
  },
  // watch: {
  //   id() {
  //     this.loadTask();
  //   },
  // },
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
    boardService,
  },
};
</script>

