<template>
  <ul class="clean-list flex task-label">
    <li
      v-for="label in taskLabels"
      :key="label.id"
      :style="{ 'background-color': label.color }"
      class="label-color"
      @click="openLabelPopup"
    >
      {{ label.title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    taskLabelIds: Array,
  },
  methods: {
    openLabelPopup() {
      this.$emit("openLabelPopup");
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabels() {
      if(!this.taskLabelIds) return;
      const labels = this.boardLabels.filter((label) =>
        this.taskLabelIds.includes(label.id)
      );
      return labels;
    },
  },
};
</script>
