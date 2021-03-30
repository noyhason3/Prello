<template>
  <section class="group" ref="group">
    <div class="flex jcc aic space-between group-header">
      <editableTitle
        v-model="group.title"
        @input="saveGroup(group)"
      ></editableTitle>

      <button
        @click="toggleEditMenu"
        class="icon elipsis preview"
        style="position: relative"
      >
        <popUp
          class="group-edit-popup"
          v-if="menuOpen"
          tabindex="0"
          ref="groupEdit"
          @blur.native="editBlurHandler"
        >
          <template slot="main">
            <button
              @click.stop="isEditing = !isEditing"
              class="btn neutral left-align group-edit-btn edit-color"
            >
              <span class="icon cover" />
              Edit Group Color
            </button>
            <div v-if="isEditing">
              <ul class="colors-list clean-list" slot="main">
                <li v-for="(color, idx) in colorsPalette" :key="idx">
                  <div
                    :class="getEditColorClass(color)"
                    :style="`background-color: ${color}`"
                    @click="saveGroupColor(color)"
                  />
                </li>
              </ul>
            </div>

            <button
              class="btn neutral left-align group-edit-btn add-card"
              @click="isAddNewTask = true"
            >
              <span class="icon plus" />
              Add another card
            </button>

            <button
              @click="removeGroup"
              class="btn neutral left-align group-edit-btn"
            >
              <span class="icon archive" />
              Archive Group
            </button>
          </template>
        </popUp>
      </button>
    </div>

    <div class="tasks-wrapper">
      <draggable
        v-model="group.tasks"
        :group="`tasks`"
        :set-data="setData"
        @end="endDrag"
        :move="updateBoard"
        :empty-insert-threshold="50"
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
        <span>+</span>
        Add another card
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
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import boardService from "@/services/board.service.js";
import taskPreview from "../task/task-preview.vue";
import editableText from "../common/editable-text.vue";
import editableTitle from "../common/editable-title.vue";
import popUp from "@/cmps/common/pop-up.vue";
import popupCover from "@/cmps/task/popup/popup-cover.vue";
import utilService from "../../services/util.service";

export default {
  props: {
    group: Object,
    boardId: String,
    idx: Number,
  },
  data() {
    return {
      newTask: JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask)),
      isAddNewTask: false,
      ghostRect: null,
      emptyList: [],
      menuOpen: false,
      isEditing: false,
      colorsPalette: [
        "#7bc86c",
        "#f5dd29",
        "#ffaf3f",
        "#ef7564",
        "#cd8de5",
        "#5ba4cf",
        "#29cce5",
        "#6deca9",
        "#ff8ed4",
        "#172b4d",
      ],
    };
  },
  mounted() {
    this.setGroupColor();
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    openTask(task) {
      task = JSON.parse(JSON.stringify(task));
      this.$store.commit({ type: "setCurrTask", task });
      this.$router.push(`/board/${this.boardId}/${task.id}`);
    },
    async addTask() {
      if (!this.newTask.title) return;
      await this.$store.dispatch({
        type: "saveTask",
        groupId: this.group.id,
        task: this.newTask,
        activityType: `${this.user.fullname}, added the card: '${this.newTask.title}'`,
      });
      this.newTask = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyTask)
      );
      this.isAddNewTask = false;
    },
    async removeTask(taskId) {
      await this.$store.dispatch({ type: "removeTask", taskId });
    },
    async saveGroup(group) {
      await this.$store.dispatch({ type: "saveGroup", group });
    },
    async removeGroup() {
      console.log("removing group");
      await this.$store.dispatch({
        type: "removeGroup",
        groupId: this.group.id,
      });
    },
    updateBoard(ev) {
      if (ev.to.classList.contains("egt")) {
        const classes = Array.from(ev.to.classList);
        var toIndex = classes.find((savedClass) => savedClass.includes("egt-"));
        toIndex = toIndex.charAt(toIndex.length - 1);
        const selector = ".gt-" + toIndex;
        var correspondingList = document.querySelector(selector);
        correspondingList.appendChild(ev.dragged);
        return false;
      }
    },
    async saveGroupColor(color) {
      this.group.style = {
        bgColor: { value: color, id: utilService.makeId() },
      };
      await this.saveGroup(this.group);
      this.setGroupColor();
    },
    setGroupColor() {
      var group = this.$refs.group;
      const color = this.group.style.bgColor?.value || "#ebecf0";
      group.style.setProperty("--bgColor", color);
    },
    toggleEditMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) {
        this.$nextTick(() => {
          this.$refs.groupEdit.$el.focus();
        });
      }
    },
    editBlurHandler(ev) {
      const cb = () => {
        this.menuOpen = false;
        this.isEditing = false;
      };
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (classList.includes("group-edit-btn")) {
          ev.target.focus();
          if (classList.includes("add-card")) {
            this.isAddNewTask = true;
            cb();
          } else if (!classList.includes("edit-color")) {
            this.removeGroup();
            cb();
          }
        }
      } else cb();
    },
    getEditColorClass(color) {
      var str = "color-box btn";
      if (color === this.group.style.bgColor?.value) {
        str += " active";
      }
      return str;
    },
    endDrag(ev) {
      this.$emit("save-board");
    },
    startDrag(ev) {
      console.log("file: group.vue - line 251 - startDrag - ev", ev);
      ev.dataTransfer.setDragImage(new Image(), 0, 0);
    },
    setData(dataTransfer, dragEl) {
      //dataTransfer.setDragImage(new Image(), 0, 0);
      //const container = document.querySelector(".dragged-container");
      //container.appendChild(dragEl.cloneNode(true));
    },
  },
  components: {
    taskPreview,
    editableText,
    draggable,
    editableTitle,
    popUp,
    popupCover,
  },
};
</script>

<style>
</style>