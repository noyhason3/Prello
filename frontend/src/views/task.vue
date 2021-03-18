<template>
  <section class="task" v-if="task">
    <!-- <pre>{{ task }}</pre> -->
    <task-control
      @assign-member="assignMember"
      @set-checklist="saveChecklist"
      @add-task-labels="addTaskLabels"
    />
    <!-- <task-cover /> -->
    <task-title :taskTitle="task.title" @setTitle="setTitle" />
    <div v-if="task" class="task-info">
      <member-list :members="task.members" />

      <task-label
        :taskLabelIds="task.labelIds"
        @setTaskLabels="setTaskLabels"
      />
      <!-- <task-duedate /> -->
    </div>
    <editable-text
      :currTaskDescription="task.description"
      :task="task"
      @setDescription="setDescription"
    />
    <!-- <task-attachment /> -->
    <task-checklist :task="task" @save-todo="saveTodo" />
    <!-- <task-comment /> -->
    <!-- <activity-list /> -->
  </section>
</template>

<script>
import taskControl from "../cmps/task/task-cmps/task-control.vue";
import taskTitle from "../cmps/editable-title.vue";
import editableText from "../cmps/task/task-cmps/editable-text.vue";
import memberList from "../cmps/member-list.vue";
import taskChecklist from "../cmps/task/task-cmps/task-checklist.vue";
import taskLabel from "../cmps/task/task-cmps/task-label.vue";

export default {
  computed: {
    taskId() {
      return this.$route.parmas.taskId;
    },
    task() {
      return this.$store.getters.currTask; //Should we copy the task here? not inside methods.
    },
  },
  methods: {
    setTitle(title) {
      this.task.title = title;
    },
    setDescription(description) {
      this.task.description = description;
    },
    assignMember(member) {
      var task = JSON.parse(JSON.stringify(this.task));
      if (!task.members) task.members = [];
      if (
        task.members.some((assignedMember) => assignedMember._id === member._id)
      ) {
        // throw new Error('User already assigned to task')
        console.log("User already assigned to task");
        return;
      }
      task.members.push(member);
      this.saveTask(task);
    },
    setTaskLabels(labels) {
      task.labels = labels;
      console.log(this.task.labels);
    },
    saveChecklist(checklist) {
      const task = this.task;
      console.log(task);
      if (!task.checklists) task.checklists = [];
      task.checklists.push(checklist);
      this.saveTask(task);
    },
    addTaskLabels(labels) {
      console.log("labels:", labels);
      this.task.labels = labels;
      this.saveTask(this.task);
    },
    saveTodo(todo) {
      // const task = this.task
      // if (!task.checklists.todos) task.checklists.todos = [];
      // const idx = task.checklists.todos.findIndex(({id})=>id===todo.id)
      // task.checklists.todos.push(todo);
      // this.saveTask(task)
    },
  },
  components: {
    taskControl,
    taskTitle,
    memberList,
    taskChecklist,
    editableText,
    taskLabel,
  },
};
</script>

<style>
</style>