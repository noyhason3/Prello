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
      <!-- <ul v-if="task.style.coverImg">
        <li v-for="img in ">
          <img
            class="task-cover-img"
            :style="`background-image: url(${task.style.coverImg})`"
          />
        </li>
      </ul> -->
      <button class="btn">
        Upload a cover image
        <img
          class="loading"
          v-if="isLoading"
          src="https://i.pinimg.com/originals/f6/65/6a/f6656aa6fdb6b8f905dea0bcc2d71dd8.gif"
          alt=""
        />

        <input class="cover-upload-input" @change="onUploadCover" type="file" />
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
  },

  components: { popUp },
};
</script>

