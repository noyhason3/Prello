<template>
  <section class="label-edit">
    <pop-up v-if="!isDelete" :style="{ left: leftPos, top:topPos }">
      <div slot="header" class="task-popup-header">
        <h2>{{ action }} label</h2>
        <button @click="closeLabelEdit" class="btn close icon x"></button>
      </div>
      <div slot="main">
        <h3>Name</h3>
        <input type="text" v-model="labelToEdit.title" />
        <ul class="clean-list label-color-list">
          <li
            v-for="(color, idx) in colors"
            :key="'c' + idx"
            class="label-color"
          >
            <button
              @click="setLabelColor(color.color)"
              :style="{ 'background-color': color.color }"
              class="btn color"
              :class="{ 'color-in-use': color.selected }"
            ></button>
          </li>
        </ul>
        <div class="btn-container">
          <button @click="saveLabel" class="btn action narrow">Save</button>
          <button @click="toggleIsDelete" class="btn warning narrow">
            Delete
          </button>
        </div>
      </div>
    </pop-up>
    <pop-up v-else :style="{ left: leftPos, top:topPos }">
      <div slot="header" class="task-popup-header">
        <h2>Delete Label?</h2>
        <button @click="toggleIsDelete" class="btn close icon x"></button>
      </div>
      <div slot="main">
        <p>
          Do you really want to remove this label for good? It will be removed
          from all cards.
        </p>
        <button @click="removeBoardLabel" class="btn warning narrow">
          Delete
        </button>
      </div>
    </pop-up>
  </section>
</template>

<script>
import popUp from "@/cmps/common/pop-up.vue";
import utilService from "../../../services/util.service";
export default {
  props: {
    label: Object,
    action: String,
    leftPos: String,
    topPos: String
  },
  data() {
    return {
      colors: [
        { color: "#61bd4f", selected: false },
        { color: "#f5dd29", selected: false },
        { color: "#ff9f1a", selected: false },
        { color: "#eb5a46", selected: false },
        { color: "#c377e0", selected: false },

        { color: "#0079bf", selected: false },
        { color: "#00c2e0", selected: false },
        { color: "#51e898", selected: false },
        { color: "#ff78cb", selected: false },
        { color: "#344563", selected: false },
      ],
      labelToEdit: null,
      isDelete: false,
    };
  },
  created() {
    if (this.label) this.labelToEdit = { ...this.label };
    else
      this.labelToEdit = {
        id: utilService.makeId(),
        color: this.colors[0].color,
        title: "",
      };
    if (this.label) this.setSelectedColor(this.label.color);
  },
  methods: {
    closeLabelEdit() {
      this.$emit("closeLabelEdit");
    },
    setLabelColor(selectedColor) {
      this.setSelectedColor(selectedColor);
      this.labelToEdit.color = selectedColor;
    },
    setSelectedColor(selectedColor) {
      this.colors.forEach(
        (color) => (color.selected = color.color === selectedColor)
      );
    },
    saveLabel() {
      this.labelToEdit.id = utilService.makeId();
      this.$emit("save-label", this.labelToEdit);
    },
    toggleIsDelete() {
      this.isDelete = !this.isDelete;
    },
    removeBoardLabel() {
      this.toggleIsDelete();
      this.$emit("remove-board-label", this.labelToEdit.id);
      this.closeLabelEdit();
    },
  },
  
  computed: {},
  components: {
    popUp,
  },
};
</script>