<template>
  <!-- <li class="group-container"> -->
  <!-- <ul class="clean-list"> -->
  <!-- <pre>{{ group }}</pre> -->
  <section class="group">
    <div slot="header">
      <button @click="removeGroup">X</button>
      <div class="header">{{ group.title }}</div>
    </div>
    <!-- <li
        v-for="task in group.tasks"
        :key="task.id"
        class="group-tasks-wrapper"
      > -->
    <draggable
      v-model="group.tasks"
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      :move="updateBoard"
      empty-insert-threshold="50"
      draggable=".task-preview"
      :class="`clean-list group-tasks gt-${this.idx}`"
      tag="ul"
    >
      <task-preview
        v-for="task in group.tasks"
        :key="task.id"
        :task="task"
        @click.native="openTask(task)"
        @remove-task="removeTask"
      />
    </draggable>

    <!-- </li> -->
    <!-- </ul> -->
    <!-- <pre>{{ this.group }}</pre> -->
    <!-- <pre>{{ this.newTask }}</pre> -->
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
    <!-- <div slot="footer" class="group-footer"></div> -->
    <!-- </li> -->

    <draggable
      :class="`egt egt-${this.idx}`"
      v-model="emptyList"
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      :move="updateBoard"
    >
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import boardService from "@/services/board.service.js";
import taskPreview from "../task/task-preview.vue";
import editableText from "../task/task-cmps/editable-text.vue";

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
    addTask() {
      if (!this.newTask.title) return;
      // this.newTask.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({
        type: "saveTask",
        groupId: this.group.id,
        task: this.newTask,
      });
      this.newTask = boardService.getEmptyTask();
      this.isAddNewTask = false;
      console.log("Group component - line 49 - this.newTask", this.newTask);
      console.log("Group component - line 50 - this.group", this.group);
    },
    async removeTask(taskId) {
      //var group = JSON.parse(JSON.stringify(this.group));
      // const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
      // console.log("taskIdx:", taskIdx);
      // if (taskIdx < 0) return;
      // group.tasks.splice(taskIdx, 1);
      // const task = { id: taskId, inGroup: this.group.id };//TODO:fchange funcction
      const ans = await boardService.removeTask({
        boardId: this.boardId,
        taskId,
      });
      console.log("file: group.vue - line 96 - removeTask - ans", ans);
      this.saveGroup(ans.group); //Not necessary?
    },
    saveGroup(group) {
      this.$store.commit({ type: "saveGroup", group });
    },
    removeGroup() {
      this.$store.commit({ type: "removeGroup", groupId: this.group.id });
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
      console.log("file: group.vue - line 118 - updateBoard - ev", ev);
      const { draggedContext, relatedContext } = ev;
      if (
        draggedContext.element.id ===
        relatedContext.list[draggedContext.index]?.id
      ) {
        //console.log("Moving to same container");
        //return false;
      }
      console.log("file: group.vue - line 148 - updateBoard - ev.to", ev.to);
      if (ev.to.classList.contains("egt")) {
        console.log("Dragging to empty group tasks list");
        return false;
      }
    },
  },
  components: { taskPreview, editableText, draggable },
};
</script>

<style>
</style>