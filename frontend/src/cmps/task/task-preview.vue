<template>
  <section class="task-preview" v-if="task">
    <button @click="removeTask">X</button>
    <!-- <img v-if="isTaskCover" src="task.coverUrl"> -->
    <!-- If cover image- show image, if cover color set section background-color-->

    <task-label-preview v-if="taskLabelIds" :taskLabelIds="taskLabelIds" />
    <h2 class="task-title">{{ task.title }}</h2>
    <!-- <div v-if="isTaskDuedate">{{taskDueDate}}</div> -->
    <div v-if="isTaskDescription">📄</div>
    <!-- <div v-if="isTaskAttachment">📎{{attachmentCount}}</div> -->
    <!-- <member-list :members="task.members"/> -->
    <member-list v-if="taskMemebers" :members="taskMemebers" />
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
    removeTask(e) {
      e.stopPropagation();
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
    isTaskAttachment() {
      return false;
      // return this.task.attachment?.length;
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
  },
  components: {
    taskLabelPreview,
    memberList,
  },
};
</script>

