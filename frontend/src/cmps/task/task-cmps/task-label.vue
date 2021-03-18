<template>
  <ul class="label-preview">
    <li
      v-for="label in taskLabels"
      :key="label.id"
      :style="{ 'background-color': label.color }"
      class="label-color"
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
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabels() {
      const labels = this.boardLabels.filter((label) =>
        this.taskLabelIds.includes(label.id)
      );
      console.log("labels", labels);
      return labels;
    },
  },
};
</script>
