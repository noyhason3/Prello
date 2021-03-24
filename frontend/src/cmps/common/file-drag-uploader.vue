<template>
  <section
    class="file-drag-upload"
    @drop.prevent="handleFile"
    :class="{ 'file-drag': isDragOver }"
  >
    <h3 v-if="isDragOver && !isLoading" class="msg drop-file">
      Drop files to upload
    </h3>
    <img
      v-if="isLoading"
      class="loader"
      src="https://lh3.googleusercontent.com/proxy/xNRAsz9LprHZ9Swqv6a-dNPSGrh_-Yx8aHcJmyzbkyvS2opSTtRZSkiegngjsJyWeuIkYL2fhNVd6uKpOlS1q8UQqiv3CZuthg9jGG3ztTloB_OGNbFtbSC7MSHhd7Ll=s0-d"
    />
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
import utilService from "@/services/util.service.js";
export default {
  props: {
    isDragOver: Boolean,
    attachments: Array,
  },
  data() {
    return {
      isLoading: false,
      newAttachment: {
        id: null,
        title: null,
        url: null,
        createdAt: null,
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
        console.log("res:", res);
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
      this.newAttachment.title = `${res.original_filename}.${res.format}`;
      this.newAttachment.url = res.url;
      this.newAttachment.createdAt = Date.now();
      const attachmentsToEdit = [...this.attachments];
      attachmentsToEdit.push(this.newAttachment);
      this.$emit("save-attachments", attachmentsToEdit);
    },
  },
};
</script>
