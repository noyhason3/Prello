<template>
  <section>
    <button @click="removeGroup">X</button>

    <ul class="clean-list group" style="overflow-x: auto">
      <div class="header">{{ group.title }}</div>
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview
          :task="task"
          @click.native="openTask(task)"
          @remove-task="removeTask"
        />
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
        :elementType="'card'"
        @close-textarea="isAddNewTask = false"
        @input="addTask"
      />
    </ul>
  </section>
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
    removeTask(taskId) {
      const group = JSON.parse(JSON.stringify(this.group));
      const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
      console.log("taskIdx:", taskIdx);
      if (taskIdx < 0) return;
      group.tasks.splice(taskIdx, 1);
      this.saveGroup(group);
    },
    saveGroup(group) {
      this.$store.commit({ type: "saveGroup", group });
    },
    removeGroup(){
      this.$store.commit({ type: "removeGroup", groupId:this.group.id });
    }
  },
  components: { taskPreview, editableText },
};
</script>

<style>
</style>