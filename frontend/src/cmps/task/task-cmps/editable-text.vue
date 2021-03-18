<template>
  <section class="task-description">
    <form v-if="taskDescriptionEdit" @submit.prevent="setDescription">
      <textarea v-model="taskDescriptionEdit"></textarea>
      <button>save</button>
      <button type="button" @click="closeDescription">X</button>
    </form>
    <p v-else @click="editDescription">{{ taskDescriptionPreview }}</p>
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
      taskDescriptionPreview: this.currTaskDescription,
      taskDescriptionEdit: null,
    };
  },
  methods: {
    editDescription() {
      this.taskDescriptionEdit = this.taskDescriptionPreview;
    },
    setDescription() {
      this.taskDescriptionPreview = this.taskDescriptionEdit;
      this.$emit("setDescription", this.taskDescriptionPreview);
      this.closeDescription();
    },
    closeDescription() {
      this.taskDescriptionEdit = null;
    },
  },
};
</script>

<style>
</style>