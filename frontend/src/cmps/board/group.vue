<template>
  <!-- <li class="group-container"> -->
  <!-- <ul class="clean-list"> -->
  <!-- <pre>{{ group }}</pre> -->
  <section class="group">
    <div class="flex jcc aic space-between group-header">
      <div>{{ group.title }}</div>
      <button @click="removeGroup">X</button>
    </div>
    <div class="tasks-wrapper">
      <draggable
        v-model="group.tasks"
        :group="`tasks`"
        @start="startDrag"
        @end="endDrag"
        :move="updateBoard"
        :empty-insert-threshold="15"
        draggable=".task-preview"
        :class="`clean-list group-tasks gt-${this.idx}`"
        tag="ul"
        drag-class="drag"
        ghost-class="ghost"
      >
        <task-preview
          v-for="task in group.tasks"
          :key="task.id"
          :task="task"
          @click.native="openTask(task)"
          @remove-task="removeTask"
        />
      </draggable>
    </div>

    <div class="add-task">
      <button v-if="!isAddNewTask" @click="isAddNewTask = true">
        Add a new task
      </button>
      <editable-text
        v-else
        v-model="newTask.title"
        :type="'title'"
        :elementType="'task'"
        :isEditFirst="true"
        @close-textarea="isAddNewTask = false"
        @input="addTask"
      />
    </div>

    <draggable
      :class="`egt egt-${this.idx}`"
      v-model="emptyList"
      group="tasks"
      :move="updateBoard"
      :drop="updateBoard"
    >
      <!-- @start="drag = true"
      @end="drag = false" -->
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import boardService from "@/services/board.service.js";
import taskPreview from "../task/task-preview.vue";
import editableText from "../common/editable-text.vue";

export default {
  props: {
    group: Object,
    boardId: String,
    idx: Number,
  },
  data() {
    return {
      newTask: boardService.getEmptyTask(),
      isAddNewTask: false,
      ghostRect: null,
      emptyList: [],
    };
  },
  methods: {
    openTask(task) {
      task = JSON.parse(JSON.stringify(task));
      // task.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({ type: "setCurrTask", task });
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
    addTask() {
      if (!this.newTask.title) return;
      // this.newTask.group = { id: this.group.id, title: this.group.title };
      this.$store.commit({
        type: "saveTask",
        groupId: this.group.id,
        task: this.newTask,
      });
      this.newTask = boardService.getEmptyTask();
      this.isAddNewTask = false;
      console.log("Group component - line 49 - this.newTask", this.newTask);
      console.log("Group component - line 50 - this.group", this.group);
    },
    async removeTask(taskId) {
      //var group = JSON.parse(JSON.stringify(this.group));
      // const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
      // console.log("taskIdx:", taskIdx);
      // if (taskIdx < 0) return;
      // group.tasks.splice(taskIdx, 1);
      // const task = { id: taskId, inGroup: this.group.id };//TODO:fchange funcction
      const ans = await boardService.removeTask({
        boardId: this.boardId,
        taskId,
      });
      console.log("file: group.vue - line 96 - removeTask - ans", ans);
      this.saveGroup(ans.group); //Not necessary?
    },
    saveGroup(group) {
      this.$store.commit({ type: "saveGroup", group });
    },
    removeGroup() {
      this.$store.commit({ type: "removeGroup", groupId: this.group.id });
    },
    // onDrag(evt) {
    //   console.log("🚀 ~ file: group.vue ~ line 88 ~ onDrag ~ evt", evt);
    //   const dragRect = evt.draggedRect;
    // },
    // startDrag(ev, drag) {
    //   const rect = ev.item.getBoundingClientRect();
    //   this.ghostRect = ev.item.getBoundingClientRect();
    //   drag = true;
    // },
    updateBoard(ev) {
      // console.log("file: group.vue - line 118 - updateBoard - ev", ev);
      //const { draggedContext, relatedContext } = ev;
      if (ev.to.classList.contains("egt")) {
        //console.log("Dragging to empty group tasks list");
        const classes = Array.from(ev.to.classList);
        var toIndex = classes.find((savedClass) => savedClass.includes("egt-"));
        toIndex = toIndex.charAt(toIndex.length - 1);
        const selector = ".gt-" + toIndex;
        var correspondingList = document.querySelector(selector);
        correspondingList.appendChild(ev.dragged);
        return false;
      }
    },
    startDrag(ev, ui) {
      //console.log("file: group.vue - line 144 - startDrag - ui", ui);
      //console.log("file: group.vue - line 144 - startDrag - ev", ev);
      //const el = document.querySelector(".drag");
      //console.log("file: group.vue - line 147 - startDrag - el", el);
      //el.classList.add("tilted");
      //ev.item.classList.add("tilted");
      //ev.clone.classList.add("tilted");
    },
    endDrag(ev) {
      this.$emit("save-board");
    },
  },
  components: { taskPreview, editableText, draggable },
};
</script>

<style>
</style>