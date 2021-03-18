<template>
  <section class="task" v-if="task">
    <!-- <pre>{{ task }}</pre> -->
    <popup-label v-if="isLabelOpen" 
    @set-task-labels="setTaskLabels" 
    @toggle-popup="togglePopup"
    >
    </popup-label>
    <task-control
      @assign-member="assignMember"
      @set-checklist="saveChecklist"
      @set-task-labels="setTaskLabels"
      @toggle-popup="togglePopup"
    />
    <!-- <task-cover /> -->
    <task-title v-model="task.title" />

        <h4 contenteditable="true">In list: {{this.task.group.name}}</h4>

    <!-- :taskTitle="task.title"  @setTitle="setTitle" -->
    <div v-if="task" class="task-info">
      <member-list :members="task.members" />

      <task-label
        :taskLabelIds="task.labelIds"
        @set-task-labels="setTaskLabels"
        @openLabelPopup="openLabelPopup"
      />
      <!-- <task-duedate /> -->
    </div>

    <editable-text v-model="task.description" :type="'description'" />

    <!-- :currTaskDescription="task.description"
      :task="task"
      @setDescription="setDescription" -->
    <!-- <task-attachment /> -->
    <ul>
      <li v-for="checklist in task.checklists" :key="checklist.id">
        <task-checklist :checklist="checklist" @save-todo="saveTodo" />
      </li>
    </ul>
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
import popupLabel from "@/cmps/task/popup/popup-label";

export default {
  data() {
    return {
      isLabelOpen: false,
    };
  },
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
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      this.saveTask(this.task);
    },

    // TODO - MAYBE WE CAN MERGE THESE TWO TO ONE FUNCTION??

    saveChecklist(checklist) {
      const task = this.task;
      if (!task.checklists.todos) task.checklists = [];
      task.checklists.push(checklist);
      this.saveTask(task);
    },
    saveTodo(checklist) {
      const idx = task.checklists.findIndex(({ id }) => id === checklist.id);
      task.checklists.splice(idx, 1, checklist);
      this.saveTask(this.task);
    },
    saveTask(task) {
      this.$store.commit({ type: "saveTask", task });
    },
    togglePopup(str) {
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
      console.log(this.isLabelOpen);
    },
    openLabelPopup(){
      this.isLabelOpen = true;
    }
  },
  components: {
    taskControl,
    taskTitle,
    memberList,
    taskChecklist,
    editableText,
    taskLabel,
    popupLabel,
  },
};
</script>

<style>
</style>