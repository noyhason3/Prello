<template>
  <section class="editable-text">
    <form v-if="isEditing" @submit.prevent="setText">
      <textarea ref="input" :value="value"></textarea>
      <button>save</button>
      <button type="button" @click.prevent="closeTextarea">X</button>
    </form>
    <template v-else>
      <p v-if="value" @click="editDescription">{{ value }}</p>
      <p v-else @click="editDescription">Enter a title for this card...</p>
    </template>
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
    setText() {
      // this.taskDescriptionPreview = this.taskDescriptionEdit;
      // this.$emit("setText", this.taskDescriptionPreview);
      // this.closeTextarea();

      //if (this.value) this.$emit("setText", this.value);
      const val = this.$refs.input.value;
      this.$emit("input", val);
      this.closeTextarea();
    },
    closeTextarea() {
      //this.taskDescriptionEdit = null;
      this.isEditing = false;
      this.$emit("close-textarea");
    },
  },
};
</script>

<style>
</style>