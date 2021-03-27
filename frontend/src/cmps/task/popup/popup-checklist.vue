<template>
  <pop-up class="popup-checklist">
    <div slot="header" class="task-popup-header">
      <h2>Add Checklist</h2>
      <button @click="togglePopup" class="btn close icon x"></button>
    </div>
    <div slot="main">
      <h3>Title</h3>
      <input
        type="text"
        name="title"
        class="checklist-title"
        v-model="checklist.title"
      />
      <button @click="addChecklist" class="btn action narrow checklist-add">
        Add
      </button>
      <!-- <h3>Copy Items From...</h3>
      <input type="text" name="" id="" /> -->
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
export default {
  data() {
    return {
      checklist: {
        title: "",
        todos: [],
      },
    };
  },
  methods: {
    addChecklist() {
      this.$emit("add-checklist", { ...this.checklist });
      this.checklist = {
        title: "",
      };
    },
    togglePopup() {
      this.$emit("toggle-popup", "Checklist");
    },
  },
  components: { popUp },
};
</script>
