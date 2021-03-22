<template>
  <h2
    v-if="value"
    class="task-title"
    contenteditable="true"
    @blur="onBlur"
    @input="input"
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
        console.log(
          "file: editable-title.vue - line 24 - onBlur - this.value",
          this.value
        );
        this.str = this.value;
        this.$emit("input", this.value);
      }
      //this.$emit("input", this.value);
    },
    input(ev) {
      console.log("file: editable-title.vue - line 33 - input - ev", ev);
      console.log("str", this.str, "\nvalue", this.value);
    },
  },
};
</script>
