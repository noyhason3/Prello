<template>
  <section class="group">
    <ul>
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" @click.native="openTask(task)" />
      </li>
    </ul>
    <editable-text></editable-text>
  </section>
</template>

<script>
import taskPreview from "../task/task-preview.vue";
import editableText from "../task/task-cmps/editable-text.vue";
export default {
  props: {
    group: Object,
    boardId: String,
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