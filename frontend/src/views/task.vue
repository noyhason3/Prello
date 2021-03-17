<template>
  <section  class="task">
    <task-control />
    <!-- <task-cover /> -->
    <task-title />
    <div class="task-info">
      <member-list/>
      <!-- <task-label /> -->
      <!-- <task-duedate /> -->
    </div>
    <task-description />
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
      taskId(){
        return this.$route.parmas.taskId
      },
      task(){
          return this.$store.getters.task;
      } 
  },
    components: { 
    taskControl,
    taskTitle,
    memberList,
    taskDescription
    },
};
</script>

<style>
</style>