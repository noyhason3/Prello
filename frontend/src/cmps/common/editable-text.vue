<template>
  <section :class="computedClass()" @click="editDescription">
    <form v-if="isEditing" @submit.prevent="setText">
      <textarea
        ref="input"
        :value="value"
        :placeholder="placeholder"
      ></textarea>
      <div class="editable-text-controls">
        <button class="save-btn">Save</button>
        <button type="button" @click.stop="closeTextarea">X</button>
      </div>
    </form>
    <template v-else>
      <p v-if="value" class="editable-text-display">{{ value }}</p>
      <p v-else class="editable-text-display">
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
    computedClass() {
      var str = "editable-text";
      str += this.isEditing ? " open" : " closed";
      console.log(
        "file: editable-text.vue - line 69 - computedClass - str",
        str
      );
      return str;
    },
  },
  computed: {
    placeholder() {
      return `Enter a ${this.type} for this ${this.elementType}..`;
    },
  },
  mounted() {
    if (this.$refs?.input) this.$refs.input.focus();
  },
};
</script>

<style>
</style>