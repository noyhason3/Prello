<template>
  <li class="group">
    <button @click="removeGroup">X</button>
    <div class="header">{{ group.title }}</div>
    <!-- <ul class="clean-list"> -->
    <!-- <pre>{{ group }}</pre> -->
    <draggable
      v-for="task in group.tasks"
      :key="task.id"
      v-model="group.tasks"
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      :empty-insert-threshold="100"
      draggable=".task-preview"
      class="clean-list group-tasks-wrapper"
      tag="ul"
    >
      <!-- <li
        v-for="task in group.tasks"
        :key="task.id"
        class="group-tasks-wrapper"
      > -->
      <task-preview
        :task="task"
        @click.native="openTask(task)"
        @remove-task="removeTask"
      ></task-preview>
      <!-- </li> -->
    </draggable>
    <!-- </ul> -->
    <!-- <pre>{{ this.group }}</pre> -->
    <!-- <pre>{{ this.newTask }}</pre> -->
    <button v-if="!isAddNewTask" @click="isAddNewTask = true">
      Add a new task
    </button>
    <editable-text
      v-else
      v-model="newTask.title"
      :type="'title'"
      @close-textarea="isAddNewTask = false"
      @input="addTask"
    />
  </li>
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
  },
  data() {
    return {
      newTask: boardService.getEmptyTask(),
      isAddNewTask: false,
      ghostRect: null,
    };
  },
  methods: {
    openTask(task) {
      task = JSON.parse(JSON.stringify(task));
      task.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({ type: "setCurrTask", task });
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
    addTask() {
      this.newTask.group = { id: this.group.id };
      this.$store.commit({ type: "saveTask", task: this.newTask });
      this.newTask = boardService.getEmptyTask();
      this.isAddNewTask = false;
      console.log("Group component - line 49 - this.newTask", this.newTask);
      console.log("Group component - line 50 - this.group", this.group);
    },
    removeTask(taskId) {
      const group = JSON.parse(JSON.stringify(this.group));
      // const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
      // console.log("taskIdx:", taskIdx);
      // if (taskIdx < 0) return;
      // group.tasks.splice(taskIdx, 1);
      const task = { id: taskId, inGroup: group };
      boardService.removeTask({ boardId: this.boardId, task });
      this.saveGroup(group);
    },
    saveGroup(group) {
      this.$store.commit({ type: "saveGroup", group });
    },
    removeGroup() {
      this.$store.commit({ type: "removeGroup", groupId: this.group.id });
    },
    onDrag(evt) {
      console.log("🚀 ~ file: group.vue ~ line 88 ~ onDrag ~ evt", evt);
      const dragRect = evt.draggedRect;
    },
    startDrag(ev, drag) {
      const rect = ev.item.getBoundingClientRect();
      this.ghostRect = ev.item.getBoundingClientRect();
      drag = true;
    },
  },
  components: { taskPreview, editableText, draggable },
};
</script>

<style>
</style>