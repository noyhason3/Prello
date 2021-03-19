<template>
  <section class="task-attachment">
    <h4>Attachments</h4>
    <ul>
      <li v-for="attachment in attachments" :key="attachment.id">
        <attachment :attachment="attachment" />
      </li>
    </ul>
    <!-- TODO: use mmoments library for the when was created-->
  </section>
</template>

<script>
// import { uploadImg } from "@/services/img-upload.service.js";
import attachment from "./attachment.vue";
export default {
  props: {
    attachments: Array,
  },
    created(){
        console.log('atts created');
    },
  methods: {
    // dragOver(ev) {
    //   console.log("drag over");
    //   this.isDragOver = true;
    // },
    // handleFile(ev) {
    //   console.log("handle");
    //   let file;
    //   if (ev.type === "change") file = ev.target.files[0];
    //   else if (ev.type === "drop") file = ev.dataTransfer.files[0];
    //   this.onUploadImg(file);
    // },
    // async onUploadImg(file) {
    //   console.log("on upload");
    //   this.isLoading = true;
    //   this.isDragOver = false;
    //   const res = await uploadImg(file);
    //   this.$emit("save", res.url);
    //   this.attachments.push(res.url);
    //   this.isLoading = false;
    // },
  },
  components: {
    attachment,
  },
};
</script>
