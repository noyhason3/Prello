<template>
  <section v-if="value" class="task-title">
    <h3>💬</h3>
    <!-- <pre>{{ value }}</pre> -->
    <div>
      <h2 contenteditable="true" @blur="onInput">{{ value }}</h2>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    //taskTitle: String,
    value: String,
  },
  methods: {
    onInput(ev) {
      this.$emit("input", ev.target.innerText);
    },
  },
};
</script>
