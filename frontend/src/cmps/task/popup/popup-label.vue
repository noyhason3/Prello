<template>
  <section class="popup-label">
    <pop-up v-if="!isPopupEdit" :style="{left:leftPos}">
      <div slot="header" class="task-popup-header">
        <h2>Labels</h2>
        <button @click="togglePopupLabel()" class="btn close">X</button>
      </div>
      <div slot="main">
        <input
          type="search"
          @input="searchLabel"
          placeholder="Search labels..."
        />
        <ul v-if="boardLabels" class="clean-list">
          <li
            v-for="label in boardLabels"
            :key="label.id"
            class="flex align-center label-preview"
          >
            <div class="label-color">
              <button
                @click="toggleSelectLabel(label.id)"
                :style="{ 'background-color': label.color }"
                :class="{ 'label-in-use': isUsed(label.id) }"
                class="btn label"
              >
                {{ label.title }}
              </button>
            </div>
            <button @click="openLabelEdit('Change', label)">🖋</button>
          </li>
        </ul>
        <button @click="openLabelEdit('Create')">Create a new lael</button>
      </div>
    </pop-up>
    <popup-label-edit
      v-else
      :action="action"
      :label="selectedLabel"
      @save-label="saveLabel"
      @closeLabelEdit="closeLabelEdit"
      @remove-board-label="removeBoardLabel"
    />
  </section>
</template>

<script>
import popUp from "@/cmps/common/pop-up.vue";
import popupLabelEdit from "@/cmps/task/popup/popup-label-edit.vue";
export default {
  props:{
    popupLeftPos:Number
  },
  data() {
    return {
      // labels: this.$store.getters.currBoard.labels,
      isPopupEdit: false,
      action: "",
      selectedLabel: null,
    };
  },
  methods: {
    searchLabel() {
      console.log("FINISH ME!!! (search label)");
    },
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
    openLabelEdit(editAction, label) {
      this.selectedLabel = label;
      this.action = editAction;
      this.isPopupEdit = true;
    },
    closeLabelEdit() {
      this.isPopupEdit = !this.isPopupEdit;
    },
    togglePopupLabel() {
      this.$emit("toggle-popup", {str:"Label", buttonLeftPos:0});
    },
    saveLabel(label) {
      if (this.selectedLabel) {
        const { color, title } = label;
        this.selectedLabel.color = color;
        this.selectedLabel.title = title;
      } else this.boardLabels.push(label);
      this.$store.commit({ type: "saveBoardLabels", labels:this.boardLabels });
      this.closeLabelEdit();
    },
    removeBoardLabel(id) {
      const labelIdx = this.boardLabels.findIndex((label) => label.id === id);
      if (labelIdx >= 0) this.boardLabels.splice(labelIdx, 1);
      this.$store.commit({ type: "saveBoardLabels", labels:this.boardLabels });
    },
  },
  computed: {
    boardLabels() {
      const boardLabels = this.$store.getters.currBoard.labels;
      if (!boardLabels) return [];
      return boardLabels;
    },
    taskLabelIdEdit() {
      const taskLabels = this.$store.getters.currTask.labelIds;
      if (!taskLabels) return [];
      return [...taskLabels];
    },
    leftPos(){
      console.log(this.popupLeftPos);
      return `${this.popupLeftPos}px`
    }
  },
  components: {
    popUp,
    popupLabelEdit,
  },
};
</script>