<template>
  <pop-up>
    <h3 slot="header">Labels</h3>
    <div slot="main">
      <input type="search" @input="searchLabel" />
      <ul class="clean-list">
        <li
          v-for="label in boardLabels"
          :key="label.id"
          class="flex align-center label-preview"
        >
          <div :style="{ 'background-color': label.color }" :class="{'label-in-use':isUsed(label.id)}" class="label-color">
            <button @click="toggleSelectLabel(label.id)" class="btn label">
              {{ label.title }}
            </button>
          </div>
          <button>🖋</button>
        </li>
      </ul>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/pop-up.vue";
export default {
  data() {
    return {
      labels: this.$store.getters.currBoard.labels,
      boardLabels:null
    };
  },
  created(){
      this.boardLabels = loadBoardLabels()
  },
  methods: {
    searchLabel() {
      console.log("FINISH ME!!! (search label)");
    },
    toggleSelectLabel(labelId) {
      if (this.taskLabelsEdit.includes(labelId)) {
        const labelIdx = this.taskLabelsEdit.findIndex(
          (label) => label.id === labelId
        );
        this.taskLabelsEdit.splice(labelIdx, 1);
      } else this.taskLabelsEdit.push(labelId);
      this.$emit("add-task-labels", { labels: this.taskLabelsEdit });
    },
    isUsed(labelId){
        console.log('hi im function ');
        const labelIdx = this.taskLabelsEdit.findIndex(({id}) => id === labelId)
        // console.log('labelIdx',labelIdx>=0);
        return labelIdx >=0;
    },
    loadBoardLabels() {
      boardLabels = this.$store.getters.currBoard.labels;
      if (!boardLabels) return [];
      return boardLabels;
    },
  },
  computed: {
    // boardLabels() {
    //   const boardLabels = this.$store.getters.currBoard.labels;
    //   if (!boardLabels) return [];
    //   return boardLabels;
    // },
    taskLabelsEdit() {
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