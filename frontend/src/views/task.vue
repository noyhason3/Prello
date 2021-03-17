<template>
  <section class="task">
    <!-- <pre>{{ task }}</pre> -->
    <task-control />
    <!-- <task-cover /> -->
    <task-title :taskTitle="task.title" @setTitle="setTitle" />
    <div class="task-info">
      <member-list :members="taskMembers" />
      <member-list />
      <!-- <task-label /> -->
      <!-- <task-duedate /> -->
    </div>
    <task-description :taskDescription="task.description" :task="task"/>
    <!-- <task-attachment /> -->
    <!-- <task-checklist /> -->
    <!-- <task-comment /> -->
    <!-- <activity-list /> -->
  </section>
</template>

<script>
import taskControl from "../cmps/task/task-cmps/task-control.vue";
import taskTitle from "../cmps/task/task-cmps/task-title.vue";
import taskDescription from "../cmps/task/task-cmps/task-description.vue";
import memberList from "../cmps/member-list.vue";

export default {
  computed: {
    taskId() {
      return this.$route.parmas.taskId;
    },
    task() {
      return this.$store.getters.currTask || {};
    },
    taskMembers() {
      return this.task.members || [];
    },
  },
  methods: {
    setTitle(title) {
      this.task.title = title;
      console.log(this.task);
    },
  },
  components: {
    taskControl,
    taskTitle,
    memberList,
    taskDescription,
  },
};
</script>

<style>
</style>