<template>
  <section class="label-edit">
    <pop-up v-if="!isDelete">
      <div slot="header" class="label-edit-header">
        <h2>{{ action }} label</h2>
        <button @click="closeLabelEdit" class="btn close">X</button>
      </div>
      <div slot="main">
        <h3>Name</h3>
        <input type="text" v-model="labelToEdit.title"/>
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
        <button @click="saveLabel">Save</button>
        <button @click="toggleIsDelete">Delete</button>
      </div>
    </pop-up>
    <pop-up v-else>
      <h3 slot="header">Delete Label?</h3>
      <div slot="main">
        <p>
          Do you really want to remove this label for good? It will be removed
          from all cards.
        </p>
        <button @click="removeBoardLabel">Delete</button>
        <button @click="toggleIsDelete">X</button>
      </div>
    </pop-up>
  </section>
</template>

<script>
import popUp from "@/cmps/common/pop-up.vue";
export default {
  props: {
    label: Object,
    action: String,
  },
  data() {
    return {
      colors: [
        { color: "#0079BF", selected: false },
        { color: "#F2D600", selected: false },
        { color: "#51E898", selected: false },
        { color: "#EB5A46", selected: false },
        { color: "#344563", selected: false },
      ],
      labelToEdit: null,
      isDelete: false,
    };
  },
  created() {
    this.labelToEdit = { ...this.label } || {
      id: null,
      color: this.colors[0].color,
      title: "",
    };
    if(this.label) this.setSelectedColor(this.label.color)
  },
  methods: {
    closeLabelEdit() {
      this.$emit("closeLabelEdit");
    },
    setLabelColor(selectedColor) {
    this.setSelectedColor(selectedColor)
      this.labelToEdit.color = selectedColor;
    },
    setSelectedColor(selectedColor) {
      this.colors.forEach(
        (color) => (color.selected = color.color === selectedColor)
      );
    },
    saveLabel() {
      console.log(this.labelToEdit);
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