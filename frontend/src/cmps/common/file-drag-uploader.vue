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
import utilService from '@/services/util.service.js'
export default {
  props: {
    isDragOver: Boolean,
  },
  data() {
    return {
      attachments: [],
      isLoading: false,
      newAttachment: {
        id: null,
        title: null,
        url:null,
        createdAt:null,
      },
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
        this.saveAttachment(res);
      } catch (err) {
        console.log("Couldn't load image");
      } finally {
        this.$emit("not-drag-over");
      }
    },
    saveAttachment(res) {
      this.newAttachment.id = utilService.makeId();
      this.newAttachment.title = res.original_filename;
      this.newAttachment.url = res.url
      this.newAttachment.createdAt =  Date.now()
      this.attachments.push(this.newAttachment);
      this.$emit("save-attachments", this.attachments);
    },
  },
};
</script>
