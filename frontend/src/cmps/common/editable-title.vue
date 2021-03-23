<template>
  <h2
    v-if="value"
    class="editable-title"
    contenteditable="true"
    @blur="onBlur"
    ref="title"
  >
    <!-- <h3>💬</h3> -->
    {{ str }}
  </h2>
</template>

<script>
export default {
  props: {
    //taskTitle: String,
    value: String,
  },
  data() {
    return {
      str: this.value,
    };
  },
  methods: {
    onBlur(ev) {
      if (ev.target.innerText) this.$emit("input", ev.target.innerText);
      else {
        this.$emit("input", this.value);
        ev.target.innerText = this.value;
      }
    },
  },
};
</script>
