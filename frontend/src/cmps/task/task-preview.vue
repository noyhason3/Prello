<template>
  <section class="task-preview" v-if="task">
    <button @click="removeTask">X</button>
    <h2 class="task-title">{{ task.title }}</h2>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods:{
    removeTask(e){
      e.stopPropagation();
      this.$emit('remove-task', this.task.id)
    }
  }
};
</script>

<style>
</style>