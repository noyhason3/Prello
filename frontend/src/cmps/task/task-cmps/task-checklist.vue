<template>
  <section class="task-checklist">
    <!-- <ul>
      <li
        v-for="checklist in checklists"
        :key="checklist.id"
        class="clean-list"
      > -->
        <div class="header">
          ✅ {{ checklist.title }} <button>Delete</button>
        </div>
        <div class="progress-bar"></div>

        <form>
          <ul class="todos clean-list">
            <li v-for="todo in checklist.todos" :key="todo.id">
              <input type="checkbox" :id="todo.id" :name="todo.id" />
              <label :for="todo.id"> {{ todo.txt }} </label><br />
            </li>
          </ul>
          <input type="text" :name="todo.id" :id="todo.id" v-model="todo.txt" />
        </form>
        <!-- <button>Add Item</button> -->
        <button @click="addTodo">Add</button>
      <!-- </li>
    </ul> -->
  </section>
</template>

<script>
export default {
  props: {
    checklist: Object,
  },
  data() {
    return {
      todo: {
        txt: "",
        isDone: false,
      },
    };
  },
  methods: {
    addTodo() {
      if (!this.checklist.todos) this.checklist.todos = [];
      this.checklist.todos.push({...this.todo})
      this.$emit("save-todo", { ...this.checklist });
        this.todo = {
            txt:'',
            isDone: false
        }
    },
  },
};
</script>
