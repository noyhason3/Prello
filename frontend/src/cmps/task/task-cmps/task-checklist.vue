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

      <form >
        <ul class="todos clean-list">
          <li v-for="todo in checklist.todos" :key="todo.id">
            <input type="checkbox" :id="todo.id" :name="todo.id" />
            <label :for="todo.id"> {{todo.txt}} </label><br />
        
          </li>
        </ul>
      </form>
        <input type="text" name="todoTxt" id="" v-model="todo.txt">
        <!-- <button>Add Item</button> -->
        <button @click="addTodo">Add</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data(){
      return {
          todo:{
              txt:'',
              isDone: false
          }
      }
  },
  methods:{
      addTodo(){
          this.$emit('save-todo', {...this.todo})
        //   this.todo = {
        //       txt:'',
        //       isDone: false
        //   }
      }
  }
};
</script>

<style>
</style>