<template>
  <pop-up
    v-if="!isPopupEdit"
    class="popup-label"
    ref="popupLabel"
  >
    <div slot="header" class="task-popup-header">
      <h2>Labels</h2>
      <button @click="togglePopupLabel()" class="btn close icon x"></button>
    </div>
    <div slot="main">
      <input
        type="search"
        v-model="searchStr"
        placeholder="Search labels..."
        class="search-label"
      />
      <ul v-if="boardLabels" class="clean-list label-list">
        <li
          v-for="label in boardLabels"
          :key="label.id"
          class="flex align-center label-preview"
        >
          <button
            @click="toggleSelectLabel(label.id)"
            :style="'background-color:' + label.color + ';color:$clr1;'"
            :class="{ 'label-in-use': isUsed(label.id) }"
            class="btn label label-color"
          >
            {{ label.title }}
            <span v-if="isUsed(label.id)" class="icon v"></span>
          </button>
          <button
            @click="openLabelEdit($event, 'Change', label)"
            class="btn edit-label icon pencil"
          ></button>
        </li>
      </ul>
      <button
        @click="openLabelEdit($event, 'Create')"
        class="btn neutral wide create-label"
      >
        Create a new label
      </button>
    </div>
  </pop-up>
  <popup-label-edit
    v-else
    :action="action"
    :label="selectedLabel"
    :leftPos="leftPos"
    :topPos="topPos"
    @save-label="saveLabel"
    @closeLabelEdit="closeLabelEdit"
    @remove-board-label="removeBoardLabel"
  />
</template>

<script>
import popUp from "@/cmps/common/pop-up.vue";
import popupLabelEdit from "@/cmps/task/popup/popup-label-edit.vue";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isPopupEdit: false,
      action: "",
      selectedLabel: null,
      searchStr: "",
      leftPos: null,
      topPos: null,
    };
  },
  methods: {
    toggleSelectLabel(labelId) {
      if (this.taskLabelIdEdit.includes(labelId)) {
        const labelIdx = this.taskLabelIdEdit.findIndex((id) => id === labelId);
        this.taskLabelIdEdit.splice(labelIdx, 1);
      } else this.taskLabelIdEdit.push(labelId);
      this.$emit("set-task-labels", { labelIds: this.taskLabelIdEdit });
      this.$forceUpdate();
    },
    isUsed(labelId) {
      const label = this.taskLabelIdEdit.find((id) => {
        return id === labelId;
      });
      return !!label;
    },
    openLabelEdit(ev, editAction, label) {
      this.selectedLabel = label;
      this.action = editAction;
      this.isPopupEdit = true;
    },
    closeLabelEdit() {
      this.isPopupEdit = !this.isPopupEdit;
    },
    togglePopupLabel() {
      //this.$emit("toggle-popup", { str: "Label", ev });
      this.$emit("toggle-popup", "Label");
    },
    async saveLabel(label) {
      if (this.selectedLabel) {
        const { color, title } = label;
        this.selectedLabel.color = color;
        this.selectedLabel.title = title;
      } else {
        this.boardLabels.push(label);
        // toggleSelectLabel(label.id);
      }
      await this.$store.dispatch({
        type: "saveBoardLabels",
        labels: this.boardLabels,
      });
      this.closeLabelEdit();
    },
    async removeBoardLabel(id) {
      const labelIdx = this.boardLabels.findIndex((label) => label.id === id);
      if (labelIdx >= 0) this.boardLabels.splice(labelIdx, 1);
      await this.$store.dispatch({
        type: "saveBoardLabels",
        labels: this.boardLabels,
      });
    },
  },
  mounted() {
    const boundingRect = this.$refs.popupLabel.$el.getBoundingClientRect();
    this.leftPos = boundingRect.left + "px";
    this.topPos = boundingRect.top + "px";
  },
  computed: {
    boardLabels() {
      const boardLabels = this.$store.getters.currBoard.labels;
      return boardLabels.filter((label) => {
        // console.log("label:", label);
        return label.title.toLowerCase().includes(this.searchStr.toLowerCase());
      });
    },
    taskLabelIdEdit() {
      //const taskLabels = this.$store.getters.currTask.labelIds;
      const taskLabels = this.task.labelIds;
      if (!taskLabels) return [];
      return [...taskLabels];
    },
    // leftPos() {

    //   return `${this.popupLeftPos}px`;
    // },
  },
  components: {
    popUp,
    popupLabelEdit,
  },
};
</script>