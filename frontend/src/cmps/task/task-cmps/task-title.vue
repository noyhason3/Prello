<template>
  <section v-if="taskTitle" class="task-title">
    <h2 contenteditable="true" @input="onInput">{{taskTitle}}</h2>
    <div>
      <h4 contenteditable="true">In list</h4>
      <button>LIST NAME</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    taskTitle: String,
  },
  methods: {
    onInput(ev){
      console.log(ev.target.innerText)
      this.$emit('setTitle', ev.target.innerText)
    }
  },
};
</script>
