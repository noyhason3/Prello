<template>
  <section class="task-checklist">
    <div class="header">
      ✅  <h4 v-if="!isEditTitleOpen"  @click="openEditTitle">{{checklist.title}}</h4>
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
      <progress id="file" value="32" max="100">  </progress> 92%
 
    <form>
      <ul class="todos clean-list">
        <li v-for="todo in checklist.todos" :key="todo.id">
          <input type="checkbox" :id="todo.id" :name="todo.id" />
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
      checklistTitle:'',
      todo: {
        txt: "",
        isDone: false,
      },
      isEditTitleOpen: false,
      isAddTodoOpen: false,
      isEditTodoOpen: false,
    };
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
      this.checklist.title = this.checklistTitle
      this.saveChecklist()
      //  this.$emit("save-todo", { ...this.checklist });

    },
    addTodo() {
      if (!this.checklist.todos) this.checklist.todos = [];
      this.checklist.todos.push({ ...this.todo });
      this.saveChecklist()
      // this.$emit("save-todo", { ...this.checklist });
      this.todo = {
        txt: "",
        isDone: false,
      };
    },
    editTodo(todo) {
      const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
      this.checklist.todos.splice(idx, 1, todo);
      this.saveChecklist()
      // this.$emit("save-todo", { ...this.checklist });
    },
    deleteChecklist(){
      this.$emit("delete-checklist", this.checklist.id);
    },
    saveChecklist(){
       this.$emit("save-todo", { ...this.checklist });
    }
  },
  components: {
    editableText,
    // editableTitle
  },
};
</script>
