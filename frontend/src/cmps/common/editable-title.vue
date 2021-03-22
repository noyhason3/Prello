<template>
  <h2 v-if="value" class="task-title" contenteditable="true" @blur="onBlur">
    <!-- <h3>💬</h3> -->
    {{ value }}
  </h2>
</template>

<script>
export default {
  props: {
    //taskTitle: String,
    value: String,
  },
  methods: {
    onBlur(ev) {
      if (ev.target.innerText) this.$emit("input", ev.target.innerText);
      else this.$emit("input", this.value);
      //this.$emit("input", this.value);
    },
  },
};
</script>
