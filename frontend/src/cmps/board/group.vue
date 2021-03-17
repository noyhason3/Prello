<template>
  <section class="group">
    <ul>
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" @click.native="openTask(task)" />
      </li>
    </ul>
  </section>
</template>

<script>
import taskPreview from "../task/task-preview.vue";
export default {
  props: {
    group: Object,
    boardId: String,
  },
  methods: {
    openTask(task) {
      this.$store.commit({type:'setCurrTask', task})
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
  },
  components: { taskPreview },
};
</script>

<style>
</style>