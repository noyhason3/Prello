<template>
  <section class="task-preview" v-if="task">
    <!-- <button @click="removeTask" class="btn close">X</button> -->
    <!-- <img v-if="isTaskCover" src="task.coverUrl"> -->
    <!-- If cover image- show image, if cover color set section background-color-->
    <!-- <div class="task-preview-header"> -->
      <button @click="removeTask" class="btn close">X</button>
      <div
        v-if="task.style.coverColor"
        class="task-cover-preview"
        :style="`background-color: ${task.style.coverColor}`"
      />
      <img v-if="task.style.coverImg" class="task-cover-img-preview" :style="`background-image: url(${task.style.coverImg})`"  />
    <!-- </div> -->

    <div class="task-preview-main">
      <task-label-preview
        v-if="taskLabelIds"
        :taskLabelIds="taskLabelIds"
        class="task-label-preview"
      />
      <div>
        <h2 class="task-title">{{ task.title }}</h2>
        <!-- <div class="btn task-edit">
        <span>🖊</span>
      </div> -->
      </div>
      <div class="task-info-preview">
        <div v-if="taskChecklists" class="checklist-info">
          <span></span>{{ taskChecklists.complete }}/{{ taskChecklists.total }}
        </div>
        <!-- <div v-if="isTaskDuedate">{{taskDueDate}}</div> -->
        <div v-if="isTaskDescription" class="description-icon"></div>
        <div v-if="attachmentCount" class="attachment-info"><span></span>{{ attachmentCount }}</div>
        <member-list
          v-if="taskMemebers"
          :members="taskMemebers"
          :isTaskRelated="true"
          @remove-task-member="removeTaskMember"
        />
      </div>
    </div>
  </section>
</template>

<script>
import memberList from "@/cmps/common/member-list.vue";
import taskLabelPreview from "@/cmps/task/task-cmps/task-label-preview.vue";
import editableTitle from "@/cmps/common/editable-text.vue";

export default {
  props: {
    task: Object,
  },

  methods: {
    removeTask(ev) {
      ev.stopPropagation();
      this.$emit("remove-task", this.task.id);
    },
    async removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      const task = JSON.parse(JSON.stringify(this.task));
      task.members.splice(memberIdx, 1);
      await this.$store.dispatch({ type: "saveTask", task });
    },
  },
  computed: {
    // isTaskCover() {
    //   return this.task.style.coverColor;
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
    attachmentCount() {
      return this.task.attachments.length;
    },
  },
  components: {
    taskLabelPreview,
    memberList,
  },
};
</script>

