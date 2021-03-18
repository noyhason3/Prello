<template>
  <ul class="clean-list group" style="overflow-x: auto">
    <li v-for="task in group.tasks" :key="task.id">
      <task-preview :task="task" @click.native="openTask(task)" />
    </li>
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
  </ul>
</template>

<script>
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
  },
  components: { taskPreview, editableText },
};
</script>

<style>
</style>