<template>
  <section class="task-description">
    <form v-if="isEditDescription" @submit.prevent="setDescription">
      <textarea v-model="taskDescription"></textarea>
      <button>save</button>
      <button type="button" @click="closeDescription">X</button>
    </form>
    <p v-else @click="editDescription">{{ taskDescription }}</p>
  </section>
</template>

<script>
export default {
  props: {
    currTaskDescription: String,
    task: Object,
  },
  data() {
    return {
      isEditDescription: false,
      taskDescription: this.currTaskDescription,
    };
  },
  methods: {
    editDescription() {
      this.isEditDescription = true;
    },
    setDescription() {
      this.$emit("setDescription", this.taskDescription);
      closeDescription();
    },
    closeDescription() {
      this.isEditDescription = false;
    },
  },
};
</script>

<style>
</style>