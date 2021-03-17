<template>
  <section class="task-checklist">
    <ul>
      <li
        v-for="checklist in task.checklists"
        :key="checklist.id"
        class="clean-list"
      >
        <div class="header">
          ✅ {{ checklist.title }} <button>Delete</button>
        </div>
        <div class="progress-bar"></div>

        <ul class="todos">
          <li v-for="todo in checklist.todos" :key="todo.id">
            <input type="checkbox" id="todo.id" name="todo.id" />
            <label for="todo.id"> {{todo.txt}} </label><br />
          </li>
        </ul>

      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
};
</script>

<style>
</style>