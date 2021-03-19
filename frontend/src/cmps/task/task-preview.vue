<template>
  <section class="flex column space-between task-preview" v-if="task">
    <button @click="removeTask" class="btn close">X</button>
    <!-- <img v-if="isTaskCover" src="task.coverUrl"> -->
    <!-- If cover image- show image, if cover color set section background-color-->

    <task-label-preview v-if="taskLabelIds" :taskLabelIds="taskLabelIds" />
    <div class="flex">
      <h2 class="task-title">{{ task.title }}</h2>
      <div class="btn task-edit">
        <span>🖊</span>
      </div>
    </div>
    <div v-if="taskChecklists">
      ☑ {{ taskChecklists.complete }}/{{ taskChecklists.total }}
    </div>
    <div class="task-info-preview">
      <!-- <div v-if="isTaskDuedate">{{taskDueDate}}</div> -->
      <div v-if="isTaskDescription">📄</div>
      <div v-if="attachmentCount">📎{{ attachmentCount }}</div>
      <member-list v-if="taskMemebers" :members="taskMemebers" />
    </div>
  </section>
</template>

<script>
import memberList from "@/cmps/common/member-list.vue";
import taskLabelPreview from "@/cmps/task/task-cmps/task-label-preview.vue";

export default {
  props: {
    task: Object,
  },

  methods: {
    removeTask(ev) {
      ev.stopPropagation();
      this.$emit("remove-task", this.task.id);
    },
  },
  computed: {
    // isTaskCover() {
    //   return this.task.cover;
    // },

    isTaskDescription() {
      return this.task.description;
    },
    attachmentCount() {
      return this.task.attachment?.length;
    },

    isTaskDuedate() {
      return false;
      //return this.task.duedate;
    },
    taskMemebers() {
      if (!this.task.members?.length) return false;
      return this.task.members;
    },
    taskLabelIds() {
      if (!this.task.labelIds?.length) return false;
      return this.task.labelIds;
    },
    taskChecklists() {
      if (!this.task.checklists) return;
      const todosTotals = this.task.checklists.reduce(
        (acc, checklist) => {
          acc.complete += checklist.todos.filter((todo) => todo.isDone).length;
          acc.total += checklist.todos.length;
          return acc;
        },
        { total: 0, complete: 0 }
      );
      if (!todosTotals.total) return;
      return todosTotals;
    },
  },
  components: {
    taskLabelPreview,
    memberList,
  },
};
</script>

