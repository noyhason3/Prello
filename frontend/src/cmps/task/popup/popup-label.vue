<template>
  <pop-up>
    <h3 slot="header">Labels</h3>
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
          <button>🖋</button>
        </li>
      </ul>
      <button>Create a new lael</button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/pop-up.vue";
export default {
  data() {
    return {
      labels: this.$store.getters.currBoard.labels,
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
  },
  components: {
    popUp,
  },
};
</script>