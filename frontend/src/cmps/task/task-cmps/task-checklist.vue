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
        :isEditFirst="true"
        @close-textarea="isEditTitleOpen = false"
        @input="editTitle"
      />
      <button @click="deleteChecklist">Delete</button>
    </div>
    {{ progressPercentage }}%
    <progress id="file" :value="progressPercentage" max="100" />

    <form>
      <ul class="todos clean-list">
        <draggable
          v-model="checklist.todos"
          group="todos"
          @start="drag = true"
          @end="drag = false"
          animation="150"
          emptyInsertThreshold="50"
          ghost-class="ghost"
          chosen-class="chosen"
          drag-class="drag"
          draggable=".todo-container"
        >
          <li v-for="todo in checklist.todos" :key="todo.id" class="todo-container">
            <input
              type="checkbox"
              :ref="todo.id"
              :id="todo.id"
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
              :type="todo.id"
              :value="todo.id"
              :isEditFirst="true"
              @close-textarea="isEditTodoOpen = false"
              @input="editTodo(todo)"
            />
          </li>
        </draggable>
      </ul>
      <!-- <input type="text" :name="todo.id" :id="todo.id" v-model="todo.txt" /> -->
      <button v-if="!isAddTodoOpen" @click="openAddTodo">Add Item</button>
      <editable-text
        v-else
        v-model="todo.txt"
        :value="'todo'"
        :type="'todo'"
        :isEditFirst="true"
        @close-textarea="isAddTodoOpen = false"
        @input="addTodo"
      />
    </form>
  </section>
</template>

<script>
import draggable from "vuedraggable";
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
      isDragOver: false,
      drag: false,
    };
  },
  computed: {
    progressPercentage() {
      if (!this.checklist.todos.length) return 0;
      const doneTodos = this.checklist.todos.filter((todo) => todo.isDone);
      const progress = Math.floor(
        (doneTodos.length / this.checklist.todos.length) * 100
      );
      return progress;
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
    dragOver(ev) {
      if (this.drag) return;
      this.isDragOver = true;
    },
  },
  components: {
    draggable,
    editableText,
    // editableTitle
  },
};
</script>
