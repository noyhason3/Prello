<template>
  <section class="task">
    <!-- <pre>{{ task }}</pre> -->
    <task-control @assign-member="assignMember" />
    <!-- <task-cover /> -->
    <task-title :taskTitle="task.title" @setTitle="setTitle" />
    <div class="task-info">
      <member-list :members="taskMembers" />
      <member-list />
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
      this.$store.commit({ type: "setCurrTask", task });
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