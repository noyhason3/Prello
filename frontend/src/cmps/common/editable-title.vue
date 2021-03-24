<template>
  <div class="editable-title-wrapper" ref="wrapper">
    <h2
      v-if="value"
      class="editable-title"
      contenteditable="true"
      @blur="onBlur"
      @focus="toggleWrapperFocus"
      ref="title"
      spellcheck="false"
    >
      {{ str }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
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
      this.toggleWrapperFocus();
    },
    toggleWrapperFocus() {
      this.$refs.wrapper.classList.toggle("focus");
    },
  },
};
</script>
