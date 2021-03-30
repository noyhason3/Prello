<template>
  <pop-up class="popup-cover">
    <div slot="header" class="task-popup-header">
      <h2>Cover</h2>
      <button @click="togglePopup" class="btn close icon x"></button>
    </div>
    <div slot="main">
      <h3>COLORS</h3>
      <ul class="colors-list clean-list">
        <li v-for="(color, idx) in colorsPalette" :key="idx">
          <div
            :class="getColorBoxClass(color)"
            :style="`background-color: ${color}`"
            @click="setCover(color)"
          />
        </li>
      </ul>
      <button @click="removeCover" class="btn wide neutral remove-cover">
        Remove cover
      </button>
      <h3>ATTACHMENTS</h3>
      <!-- <ul v-if="task.style.coverImg">
        <li v-for="img in ">
          <img
            class="task-cover-img"
            :style="`background-image: url(${task.style.coverImg})`"
          />
        </li>
      </ul> -->
      <button class="btn neutral wide upload-cover-btn">
        Upload a cover image

        <img
          class="loading"
          v-if="isLoading"
          src="https://raw.githubusercontent.com/SamHerbert/SVG-Loaders/5deed925369e57e9c58ba576ce303466984db501/svg-loaders/oval.svg"
        />

        <input class="cover-upload-input" @change="onUploadCover" type="file" />
      </button>
      <p>Tip:Drag an image on to the card to upload it.</p>
      <!-- <h3>UNSPLASH</h3>
      <button @click="search" class="btn narrow action-color">
        Search for photos
      </button> -->
    </div>
  </pop-up>
</template>

<script>
import popUp from "../../common/pop-up.vue";
import { uploadImg } from "@/services/img-upload.service.js";

export default {
  data() {
    return {
      isLoading: false,
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
      this.$emit("set-cover-color", color);
    },
    search() {},
    togglePopup() {
      this.$emit("toggle-popup", "Cover");
    },
    async onUploadCover(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev.target.files[0]);
      this.$emit("save-cover-img", res);
      console.log("onUploadImg -> res", res);
      this.isLoading = false;
    },
    removeCover() {
      console.log("hi");
      this.$emit("remove-cover");
    },
    getColorBoxClass(color) {
      var str = "color-box btn";
      console.log(
        "file: popup-cover.vue - line 95 - getColorBoxClass - this.$store.currTask",
        this.$store.getters.currTask?.style.coverColor
      );
      if (color === this.$store.getters.currTask?.style.coverColor) {
        str += " active";
      }
      return str;
    },
  },

  components: { popUp },
};
</script>

