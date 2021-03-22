<template>
  <!-- <li class="group-container"> -->
  <!-- <ul class="clean-list"> -->
  <!-- <pre>{{ group }}</pre> -->
  <section class="group">
    <div class="flex jcc aic space-between group-header">
      <!-- <div>{{ group.title }}</div> -->
      <editableTitle
        v-model="group.title"
        @input="saveGroup(group)"
      ></editableTitle>

      <button @click="removeGroup">X</button>
    </div>
    <div class="tasks-wrapper">
      <draggable
        v-model="group.tasks"
        :group="`tasks`"
        @start="startDrag"
        @end="endDrag"
        :move="updateBoard"
        :empty-insert-threshold="50"
        draggable=".task-preview"
        :class="`clean-list group-tasks gt-${this.idx}`"
        tag="ul"
        drag-class="drag"
        ghost-class="ghost"
      >
        <task-preview
          v-for="task in group.tasks"
          :key="task.id"
          :task="task"
          @click.native="openTask(task)"
          @remove-task="removeTask"
        />
      </draggable>
    </div>

    <div class="add-task">
      <button v-if="!isAddNewTask" @click="isAddNewTask = true">
        Add a new task
      </button>
      <editable-text
        v-else
        v-model="newTask.title"
        :type="'title'"
        :elementType="'task'"
        :isEditFirst="true"
        @close-textarea="isAddNewTask = false"
        @input="addTask"
      />
    </div>

    <draggable
      :class="`egt egt-${this.idx}`"
      v-model="emptyList"
      group="tasks"
      :move="updateBoard"
      :drop="updateBoard"
    >
      <!-- @start="drag = true"
      @end="drag = false" -->
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import boardService from "@/services/board.service.js";
import taskPreview from "../task/task-preview.vue";
import editableText from "../common/editable-text.vue";
import editableTitle from "../common/editable-title.vue";

export default {
  props: {
    group: Object,
    boardId: String,
    idx: Number,
  },
  data() {
    return {
      newTask: boardService.getEmptyTask(),
      isAddNewTask: false,
      ghostRect: null,
      emptyList: [],
    };
  },
  methods: {
    openTask(task) {
      task = JSON.parse(JSON.stringify(task));
      // task.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({ type: "setCurrTask", task });
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
    async addTask() {
      if (!this.newTask.title) return;
      // this.newTask.group = { id: this.group.id, title: this.group.title };
      await this.$store.dispatch({
        type: "saveTask",
        groupId: this.group.id,
        task: this.newTask,
      });
      this.newTask = this.$store.getEmptyTask();
      this.isAddNewTask = false;
      console.log("Group component - line 49 - this.newTask", this.newTask);
      console.log("Group component - line 50 - this.group", this.group);
    },
    async removeTask(taskId) {
      await this.$store.dispatch({ type: "removeTask", taskId });
    },
    async saveGroup(group) {
      await this.$store.dispatch({ type: "saveGroup", group });
    },
    async removeGroup() {
      await this.$store.dispatch({
        type: "removeGroup",
        groupId: this.group.id,
      });
    },
    // onDrag(evt) {
    //   console.log("🚀 ~ file: group.vue ~ line 88 ~ onDrag ~ evt", evt);
    //   const dragRect = evt.draggedRect;
    // },
    // startDrag(ev, drag) {
    //   const rect = ev.item.getBoundingClientRect();
    //   this.ghostRect = ev.item.getBoundingClientRect();
    //   drag = true;
    // },
    updateBoard(ev) {
      // console.log("file: group.vue - line 118 - updateBoard - ev", ev);
      //const { draggedContext, relatedContext } = ev;
      if (ev.to.classList.contains("egt")) {
        //console.log("Dragging to empty group tasks list");
        const classes = Array.from(ev.to.classList);
        var toIndex = classes.find((savedClass) => savedClass.includes("egt-"));
        toIndex = toIndex.charAt(toIndex.length - 1);
        const selector = ".gt-" + toIndex;
        var correspondingList = document.querySelector(selector);
        correspondingList.appendChild(ev.dragged);
        return false;
      }
    },
    startDrag(ev, ui) {
      //console.log("file: group.vue - line 144 - startDrag - ui", ui);
      //console.log("file: group.vue - line 144 - startDrag - ev", ev);
      //const el = document.querySelector(".drag");
      //console.log("file: group.vue - line 147 - startDrag - el", el);
      //el.classList.add("tilted");
      //ev.item.classList.add("tilted");
      //ev.clone.classList.add("tilted");
    },
    endDrag(ev) {
      this.$emit("save-board");
    },
  },
  components: { taskPreview, editableText, draggable, editableTitle },
};
</script>

<style>
</style>