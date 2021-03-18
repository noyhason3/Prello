<template>
  <pop-up>
    <div slot="header" class="flex space-between">
      <h3>{{ action }} label</h3>
      <button @click="closeLabelEdit">X</button>
    </div>
    <div slot="main">
      <label>Name</label>
      <input type="text" v-model="labelToEdit.title" />
      <ul class="clean-list">
        <li v-for="(color, idx) in colors" :key="'c' + idx" class="label-color" :class="{'is-selected':color.selected}">
          <button
            @click="setLabelColor(color)"
            :style="{ 'background-color': color.color }"
            class="btn label-color"
          >
          </button>
        </li>
      </ul>
      <button @click="saveLabel">Save</button>
      <button @click="removeBoardLabel">Delete</button>
    </div>
  </pop-up>
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
    };
  },
  created() {
    this.labelToEdit = {...this.label} || {
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
    saveLabel(){
        console.log(this.labelToEdit);
        this.$emit('save-label', this.labelToEdit)
    },
    removeBoardLabel(){
        this.$emit('remove-board-label', label.id)
    }
  },
  computed: {
  },
  components: {
    popUp,
  },
};
</script>