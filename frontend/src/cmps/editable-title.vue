<template>
  <section v-if="taskTitle" class="task-title">
    <h3>💬</h3>
    <div>
      <h2 contenteditable="true" @blur="onInput">{{ taskTitle }}</h2>
      <div class="list-name">
        <h4 contenteditable="true">In list</h4>
        <button>LIST NAME</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    taskTitle: String,
  },
  methods: {
    onInput(ev) {
      this.$emit("setTitle", ev.target.innerText);
    },
  },
};
</script>
