<template>
  <section class="group">
    <ul>
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" @click.native="openTask(task)" />
      </li>
      <!-- <pre>{{ this.newTask }}</pre> -->
      <button v-if="!isAddNewCard" @click="isAddNewCard = true">
        Add a new card
      </button>
      <editable-text
        v-else
        v-model="newTask.title"
        @close-textare="this.isAddNewCard = false"
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
      isAddNewCard: false,
    };
  },
  methods: {
    openTask(task) {
      task = JSON.parse(JSON.stringify(task));
      task.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({ type: "setCurrTask", task });
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
  },
  components: { taskPreview, editableText },
};
</script>

<style>
</style>