<template>
  <li class="task-checklist">
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
      <!-- <ul class="todos clean-list"> -->
        <!-- :list="checklist.todos" -->
        <!-- :move="updateTask" -->
      <draggable
        @start="setDrag(true)"
        @end="setDrag(false),updateTask()"
        
        group="todos"
        animation="150"
        empty-insert-threshold="50"
        draggable="li"
        tag="ul"
        class="todos clean-list"
      >
        <!-- <li v-for="todo in checklist.todos" :key="todo.id">{{ todo.txt }}</li> -->
        <li
          v-for="todo in checklist.todos"
          :key="todo.id"
          class="todo-container"
        >
          <input
            type="checkbox"
            :ref="todo.id"
            :id="todo.id"
            :name="todo.id"
            @click="toggleChecked(todo)"
            :checked="todo.isDone"
          />
          <!-- <label :for="todo.id"  @click="openEditTodo(todo.id)">
            {{ todo.txt }}
          </label> -->
          <label
            :for="todo.id"
            v-if="todo.id !== currTodoId"
            @click="setCurrTodo(todo.id)"
          >
            {{ todo.txt }}
          </label>

          <editable-text
            v-else
            v-model="todo.txt"
            :type="todo.id"
            :value="todo.id"
            :isEditFirst="todo.id === currTodoId"
            @close-textarea="isEditTodoOpen = false"
            @input="editTodo(todo)"
          >
          </editable-text>
        </li>
      </draggable>
      <!-- </ul> -->
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
  </li>
</template>

<script>
import draggable from "vuedraggable";
import editableText from "./editable-text.vue";
// import editableTitle from '../../common/editable-title.vue'

export default {
  props: {
    checklist: Object,
    progressPercentage: Number,
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

      currTodoId: "",
      isEditTodoOpen: false,
      isDragOver: false,
      dragTodo: false,
    };
  },
  computed: {
    // progressPercentage() {
    //   if (!this.checklist.todos.length) return 0;
    //   const doneTodos = this.checklist.todos.filter((todo) => todo.isDone);
    //   const progress = Math.floor(
    //     (doneTodos.length / this.checklist.todos.length) * 100
    //   );
    //   return progress;
    // },
  },
  methods: {
    openAddTodo() {
      this.isAddTodoOpen = true;
    },
    setCurrTodo(todoId) {
      this.currTodoId = todoId;
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
    setDrag(isDrag) {
      this.dragTodo = isDrag;
      this.$emit("toggle-drag", isDrag);
    },
    updateTask(ev) {
      console.log("D&D todo event", ev);
      const { draggedContext, relatedContext } = ev;
      if (
        draggedContext.element.id ===
        relatedContext.list[draggedContext.index]?.id
      ) {
        //console.log("Moving to same container");
        return false;
      }
    },
  },
  components: {
    draggable,
    editableText,
    // editableTitle
  },
};
</script>
