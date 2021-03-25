<template>
  <section
    class="task-screen"
    v-if="task"
    @dragover.prevent="dragOver"
    @click.stop="closeTask"
  >
    <div class="task" :style="`top:${initialHeight}px;`" @click.stop>
      <div class="task-cover">
        <div
          v-if="task.style.coverColor"
          class="task-cover-color"
          :style="`background-color: ${task.style.coverColor}`"
        />
        <img
          v-if="task.style.coverImg"
          class="task-cover-img"
          :src="task.style.coverImg"
        />
        <!-- :style="`background-image: url(${task.style.coverImg})`" -->
      </div>
      <div class="header">
        <button @click.stop="closeTask" class="btn close">X</button>
        <div class="task-title">
          <div class="icon"></div>
          <task-title
            v-model="task.title"
            @click.prevent
            @input="saveTask(task)"
          />
        </div>
        <h6 v-if="groupTitle">In list: {{ groupTitle }}</h6>
      </div>
      <div class="task-content" @click.stop>
        <popup-label
          v-if="isLabelOpen"
          :popupLeftPos="popupLeftPos"
          @set-task-labels="setTaskLabels"
          @toggle-popup="togglePopup"
        >
        </popup-label>
        <task-control
          @toggle-popup="togglePopup"
          @set-cover-color="setCoverColor"
          @save-cover-img="saveCoverImg"
          @assign-task-member="assignTaskMember"
          @remove-task-member="removeTaskMember"
          @set-checklist="saveChecklist"
          @set-task-labels="setTaskLabels"
          @save-date="saveDate"
          @save-attachments="saveAttachments"
          :attachments="attachments"
        />

        <div class="task-main">
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
            <div class="task-duedate" v-if="task.duedate">
              <input type="checkbox" />
              {{ date.day }} at {{ date.hour }}
            </div>
          </div>

          <h4 class="description title-icon"><span></span> Description</h4>
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

          <draggable
            v-model="task.checklists"
            group="checklists"
            @start="drag = true"
            @end="
              drag = false;
              saveTask(task);
            "
            animation="150"
            empty-insert-threshold="50"
            draggable=".checklist-container"
            tag="ul"
            class="clean-list"
          >
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
          </draggable>
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
import { boardService } from "../services/board.service";
import moment from "moment";

export default {
  data() {
    return {
      isLabelOpen: false,
      isDragOver: false,
      drag: false,
      popupLeftPos: null,
      groupTitle: null,
      initialHeight: null,
    };
  },
  async created() {
    await this.group();
    const body = document.querySelector(".main").getBoundingClientRect();
    this.initialHeight = body.top + 5;
  },
  computed: {
    task() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask));
    },
    attachments() {
      return this.task.attachments;
    },
    date() {
      const timestamp = this.task.duedate;
      const day = moment.unix(timestamp).format("MMM D");
      const hour = moment.unix(timestamp).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
  },
  methods: {
    async group() {
      const group = await this.$store.dispatch({ type: "getGroup" });
      this.groupTitle = group.title;
    },
    setDescription() {
      this.saveTask(this.task);
    },
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
      if (!this.task.members) this.task.members = [];
      this.task.members.push(member);
      this.saveTask(this.task);
    },
    removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      this.task.members.splice(memberIdx, 1);
      this.saveTask(this.task);
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask(this.task);
    },
    saveChecklist(checklist) {
      const task = this.task;
      task.checklists.push(checklist);
      this.saveTask(task);
    },
    // TODO - MAYBE WE CAN MERGE THESE TWO TO ONE FUNCTION??
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
    async saveTask(task) {
      console.log("file: task.vue - line 165 - saveTask - task", task);
      await this.$store.dispatch({ type: "saveTask", task });
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
    },
    openLabelPopup(buttonLeftPos) {
      this.popupLeftPos = buttonLeftPos;
      this.isLabelOpen = true;
    },
    saveDate(timestamp) {
      // const timestamp = moment(date, "M/D/YYYY hh:mm a").format("X");
      this.task.duedate = timestamp;
      this.saveTask(this.task);
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

