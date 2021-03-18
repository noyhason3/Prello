<template>
  <section>
    <pop-up v-if="!isDelete">
      <div slot="header" class="flex space-between">
        <h3>{{ action }} label</h3>
        <button @click="closeLabelEdit">X</button>
      </div>
      <div slot="main">
        <label>Name</label>
        <input type="text" v-model="labelToEdit.title" />
        <ul class="clean-list">
          <li
            v-for="(color, idx) in colors"
            :key="'c' + idx"
            class="label-color"
            :class="{ 'is-selected': color.selected }"
          >
            <button
              @click="setLabelColor(color)"
              :style="{ 'background-color': color.color }"
              class="btn label-color"
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
      </div>
    </pop-up>
  </section>
</template>

<script>
import popUp from "@/cmps/pop-up.vue";
export default {
  props: {
    label: Object,
    action: String,
  },
  data() {
    return {
      colors: [
        { color: "#0079BF", selected: true },
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
      color: this.colors[0],
      title: "",
    };
  },
  methods: {
    closeLabelEdit() {
      this.$emit("closeLabelEdit");
    },
    setLabelColor(color) {
      this.labelToEdit.color = color.color;
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