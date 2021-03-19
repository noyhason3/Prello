<template>
  <section 
    class="file-drag-upload"
    @drop.prevent="handleFile"
    @dragover.prevent="dragOver"
    @dragleave="isDragOver = false"
    :class="{ 'file-drag': isDragOver }"
  >
    <h3 v-if="isDragOver" class="msg drop-file">Drop files to upload</h3>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      attachments: [],
      isLoading: false,
      isDragOver: false,
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.attachments.push(res.url);
      this.$emit("save-attachments", res.url);
      this.isLoading = false;
    },
  },
};
</script>
