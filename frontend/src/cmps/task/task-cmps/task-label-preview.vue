<template>
  <ul @click="toggleEnlargeLabels" class="clean-list flex label-preview">
    <li
      v-for="label in taskLabels"
      :key="label.id"
      :style="{ 'background-color': label.color }"
      class="preview-label"
      :class="{ 'enlarged-label': isEnlarged }"
      
    >
      <span v-if="isEnlarged">{{ label.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    taskLabelIds: Array,
  },
  data() {
    return {
      isEnlarged: false,
    };
  },
  methods: {
    toggleEnlargeLabels(ev) {
      ev.stopPropagation();
      this.isEnlarged = !this.isEnlarged;
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabels() {
      console.log(this.taskLabelIds);
      if (!this.taskLabelIds) return [];
      const labels = this.boardLabels.filter((label) =>
        this.taskLabelIds.includes(label.id)
      );
      return labels;
    },
  },
};
</script>
