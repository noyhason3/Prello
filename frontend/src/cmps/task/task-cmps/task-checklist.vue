<template>
  <section class="task-checklist">
    <div class="header">
      ✅
      <h4 v-if="!isEditTitleOpen" @click="openEditTitle">
        {{ checklist.title }}
      </h4>
      <editable-text
        v-else
        v-model="checklistTitle"
        :value="'todo-title'"
        :type="'todo-title'"
        @close-textarea="isEditTitleOpen = false"
        @input="editTitle"
      />
      <button @click="deleteChecklist">Delete</button>
    </div>
    <progress id="file" :value="progressPercentage" max="100"></progress>

    <form>
      <ul class="todos clean-list">
        <li v-for="todo in checklist.todos" :key="todo.id">
          <input
            type="checkbox"
            :id="todo.id"
            :ref="todo.id"
            :name="todo.id"
            @click="toggleChecked(todo)"
            :checked="todo.isDone"
          />
          <label :for="todo.id" v-if="!isEditTodoOpen" @click="openEditTodo">
            {{ todo.txt }}
          </label>
          <editable-text
            v-else
            v-model="todo.txt"
            :value="'todo'"
            :type="'todo'"
            @close-textarea="isEditTodoOpen = false"
            @input="editTodo(todo)"
          />
        </li>
      </ul>
      <!-- <input type="text" :name="todo.id" :id="todo.id" v-model="todo.txt" /> -->
      <button v-if="!isAddTodoOpen" @click="openAddTodo">Add Item</button>
      <editable-text
        v-else
        v-model="todo.txt"
        :value="'todo'"
        :type="'todo'"
        @close-textarea="isAddTodoOpen = false"
        @input="addTodo"
      />
    </form>
  </section>
</template>

<script>
import editableText from "./editable-text.vue";
// import editableTitle from '../../common/editable-title.vue'

export default {
  props: {
    checklist: Object,
  },
  data() {
    return {
      checklistTitle: "",
      todo: {
        txt: "",
        isDone: false,
      },
      isEditTitleOpen: false,
      isAddTodoOpen: false,
      isEditTodoOpen: false,
    };
  },
  computed:{
    progressPercentage(){
      if (!this.task.checklists) return;
      const todosTotals = this.task.checklists.reduce(
        (acc, checklist) => {
          acc.complete += checklist.todos.filter((todo) => todo.isDone).length;
          acc.total += checklist.todos.length;

          return acc;
        },
        { total: 0, complete: 0 }
      );
      if (!todosTotals.total) return;
      return todosTotals.complete/todosTotals.total;
    },
  },
  methods: {
    openAddTodo() {
      this.isAddTodoOpen = true;
    },
    openEditTodo() {
      this.isEditTodoOpen = true;
    },
    openEditTitle() {
      this.isEditTitleOpen = true;
    },
    editTitle() {
      this.checklist.title = this.checklistTitle;
      this.saveChecklist();
      //  this.$emit("save-todo", { ...this.checklist });
    },
    addTodo() {
      if (!this.checklist.todos) this.checklist.todos = [];
      this.checklist.todos.push({ ...this.todo });
      this.saveChecklist();
      // this.$emit("save-todo", { ...this.checklist });
      this.todo = {
        txt: "",
        isDone: false,
      };
    },
    editTodo(todo) {
      const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
      this.checklist.todos.splice(idx, 1, todo);
      this.saveChecklist();
      // this.$emit("save-todo", { ...this.checklist });
    },
    toggleChecked(todo) {
      const checkBox = document.getElementById(todo.id);
      // const checkBox = this.$refs[todoId]
      console.log(checkBox);
      if (checkBox.checked) todo.isDone = true;
      else todo.isDone = false;

      this.saveChecklist();
    },
    deleteChecklist() {
      this.$emit("delete-checklist", this.checklist.id);
    },
    saveChecklist() {
      this.$emit("save-todo", { ...this.checklist });
    },
  },
  components: {
    editableText,
    // editableTitle
  },
};
</script>
