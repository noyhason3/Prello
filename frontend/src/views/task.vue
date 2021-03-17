<template>
  <section class="task">
    <!-- <pre>{{ task }}</pre> -->
    <task-control @assign-member="assignMember" @set-checklist="saveChecklist"/>
    <!-- <task-cover /> -->
    <task-title :taskTitle="task.title" @setTitle="setTitle" />
    <div v-if="task" class="task-info">
      <member-list :members="task.members" />

      <task-label :taskLabels="task.labels" @setTaskLabels="setTaskLabels" />
      <!-- <task-duedate /> -->
    </div>
    <task-description
      :currTaskDescription="task.description"
      :task="task"
      @setDescription="setDescription"
    />
    <!-- <task-attachment /> -->
    <task-checklist :task="task" />
    <!-- <task-comment /> -->
    <!-- <activity-list /> -->
  </section>
</template>

<script>
import taskControl from "../cmps/task/task-cmps/task-control.vue";
import taskTitle from "../cmps/task/task-cmps/task-title.vue";
import taskDescription from "../cmps/task/task-cmps/task-description.vue";
import memberList from "../cmps/member-list.vue";
import taskChecklist from "../cmps/task/task-cmps/task-checklist.vue";
import taskLabel from "../cmps/task/task-cmps/task-label.vue";

export default {
  computed: {
    taskId() {
      return this.$route.parmas.taskId;
    },
    task() {
      return this.$store.getters.currTask || {};
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
      this.$store.commit({ type: "setCurrTask", task });
    },
    setTaskLabels(labels) {
      task.labels = labels;
      console.log(this.task.labels);
    },
    saveChecklist(checklist) {
      console.log('hi');
      const task = this.task
      if (!task.checklists) task.checklists = [];
      task.checklists.push(checklist);
      this.$store.commit({type:'saveTask', task})
    },
  },
  components: {
    taskControl,
    taskTitle,
    memberList,
    taskChecklist,
    taskDescription,
    taskLabel,
  },
};
</script>

<style>
</style>