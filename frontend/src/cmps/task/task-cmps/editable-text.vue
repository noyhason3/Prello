<template>
  <section class="task-description">
    <form v-if="isEditing" @submit.prevent="setDescription">
      <textarea
        :value="value"
        @input="$emit('input', $event.target.value)"
      ></textarea>
      <button>save</button>
      <button type="button" @click="closeDescription">X</button>
    </form>
    <p v-else @click="editDescription">{{ value }}</p>
  </section>
</template>

<script>
export default {
  props: {
    // currTaskDescription: String,
    // task: Object,
    value: String,
  },
  data() {
    return {
      // isEditDescription: false,
      // taskDescriptionPreview: this.currTaskDescription,
      // taskDescriptionEdit: null,
      isEditing: false,
    };
  },
  methods: {
    editDescription() {
      //this.taskDescriptionEdit = this.taskDescriptionPreview;
      // this.isEditDescription = true;

      this.isEditing = true;
    },
    setDescription() {
      // this.taskDescriptionPreview = this.taskDescriptionEdit;
      // this.$emit("setDescription", this.taskDescriptionPreview);
      // this.closeDescription();
      this.$emit("setDescription", this.value);
    },
    closeDescription() {
      //this.taskDescriptionEdit = null;
      this.isEditing = false;
    },
  },
};
</script>

<style>
</style>