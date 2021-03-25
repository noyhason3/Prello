<template>
  <section :class="computedClass()" @click="editDescription">
    <form v-if="isEditing" @submit.prevent="setText">
      <textarea
        ref="input"
        :value="value"
        :placeholder="placeholder"
      ></textarea>
      <div class="editable-text-controls">
        <button class="btn action">Save</button>
        <button type="button" @click.stop="closeTextarea" class="icon x"></button>
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
    isEditFirst: Boolean,
    type: "",
    value: String,
    elementType: String,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  created() {
    if (this.isEditFirst) this.isEditing = this.isEditFirst;
  },
  methods: {
    editDescription() {
      this.isEditing = true;
    },
    setText() {
      const val = this.$refs.input.value;
      this.$emit("input", val);
      this.closeTextarea();
    },
    closeTextarea() {
      this.isEditing = false;
      this.$emit("close-textarea");
    },
    computedClass() {
      var str = "editable-text";
      str += this.isEditing ? " open" : " closed";
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