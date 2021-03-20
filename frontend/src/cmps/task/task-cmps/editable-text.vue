<template>
  <section class="editable-text">
    <form v-if="isEditing" @submit.prevent="setText">
      <textarea ref="input" :value="value" :placeholder="placeholder"></textarea>
      <button class="save-btn">Save</button>
      <button type="button" @click.prevent="closeTextarea">X</button>
    </form>
    <template v-else>
      <p v-if="value" @click="editDescription">{{ value }}</p>
      <p v-else @click="editDescription">
        Enter a {{ type }} for this {{ elementType }}...
      </p>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    // currTaskDescription: String,
    // task: Object,
    isEditFirst: Boolean,
    type: "",
    value: String,
    elementType: String,
  },
  data() {
    return {
      // isEditDescription: false,
      // taskDescriptionPreview: this.currTaskDescription,
      // taskDescriptionEdit: null,
      isEditing: false,
    };
  },
  created() {
    console.log();
    if (this.isEditFirst) this.isEditing = this.isEditFirst;
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
  computed:{
    placeholder(){
      return `Enter a ${ this.type } for this ${ this.elementType }..`
    }
  },
  mounted() {
    if (this.$refs?.input) this.$refs.input.focus();
  },
};
</script>

<style>
</style>