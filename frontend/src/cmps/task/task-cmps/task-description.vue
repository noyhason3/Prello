<template>
  <section class="task-description">
    <form v-if="isEditDescription" @submit.prevent="setDescription">
      <textarea v-model="taskDescription"></textarea>
      <button>save</button>
    </form>
    <p v-else @click="editDescription">{{ taskDescription }}</p>
  </section>
</template>

<script>
export default {
  props: {
    taskDescription: String,
    task: Object,
  },
  data() {
    return {
      isEditDescription: false,
    };
  },
  created() {
    console.log("task dsescription:", this.taskDescription);
    console.log("task:", this.task);
  },
  methods: {
    editDescription() {
      this.isEditDescription = true;
    },
    setDescription(){
      this.$emit('setDescription', this.taskDescription)
      this.isEditDescription = false;
    }
  },
};
</script>

<style>
</style>