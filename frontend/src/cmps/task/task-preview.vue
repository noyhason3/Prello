<template>
  <section class="task-preview" v-if="task">
    <h2 class="task-title">{{ task.title }}</h2>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
};
</script>

<style>
</style>