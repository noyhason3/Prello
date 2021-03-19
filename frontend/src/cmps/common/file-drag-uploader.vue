<template>
  <section
    class="file-drag-upload"
    @drop.prevent="handleFile"
    :class="{ 'file-drag': isDragOver }"
  >
    <h3 v-if="isDragOver" class="msg drop-file">Drop files to upload</h3>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  props: {
    isDragOver: Boolean,
  },
  data() {
    return {
      attachments: [],
      isLoading: false,
    };
  },
  methods: {
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      try {
        this.isLoading = true;
        const res = await uploadImg(file);
        this.isLoading = false;
        this.saveAttachment(res.url)
        console.log('res:', res)
      } catch (err) {
        console.log('Couldn\'t load image');
      } finally {
        this.$emit("not-drag-over");
      }
    },
    saveAttachment(url){
        this.attachments.push(url);
        this.$emit("save-attachments", this.attachments);
    }
  },
};
</script>
