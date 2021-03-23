<template>
  <pop-up class="popup-cover">
    <div slot="header" class="task-popup-header">
      <h2>Cover</h2>
      <button @click="togglePopup" class="btn close">X</button>
    </div>
    <div slot="main">
      <h3>COLORS</h3>
      <ul class="colors-list clean-list">
        <li v-for="(color, idx) in colorsPalette" :key="idx">
          <div
            class="color-box btn"
            :style="`background-color: ${color}`"
            @click="setCover(color)"
          />
        </li>
      </ul>
      <h3>ATTACHMENTS</h3>
      <button @click="upload" class="btn narrow action-color">
        Upload a cover image
      </button>
      <p>Tip:Drag an image on to the card to upload it.</p>
      <h3>UNSPLASH</h3>
      <button @click="search" class="btn narrow action-color">
        Search for photos
      </button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "../../common/pop-up.vue";
export default {
  data() {
    return {
      colorsPalette: [
        "#7bc86c",
        "#f5dd29",
        "#ffaf3f",
        "#ef7564",
        "#cd8de5",
        "#5ba4cf",
        "#29cce5",
        "#6deca9",
        "#ff8ed4",
        "#172b4d",
      ],
    };
  },
  computed: {},
  methods: {
    setCover(color) {
        console.log(color);
        this.$emit('set-cover-color', color)
    },
    upload() {},
    search() {},
    togglePopup() {
      this.$emit("toggle-popup", "Cover");
    },
  },

  components: { popUp },
};
</script>

