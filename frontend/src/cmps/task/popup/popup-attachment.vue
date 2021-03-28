<template>
  <pop-up class="popup-attachment">
    <div slot="header" class="task-popup-header">
      <h2>Attach from...</h2>
      <button @click="togglePopup" class="btn close icon x"></button>
    </div>
    <div slot="main">
      <button class="btn file-upload">
        Computer
        <input class="file-upload-input" @change="onUploadImg" type="file" />
      </button>
      <form @submit.prevent="saveAttachment">
        <h3>Attach a link</h3>
        <input
          type="text"
          v-model="url"
          @change="toggleAddName"
          placeholder="Paste any link here..."
          class="url-input"
        />
        <div v-if="url">
          <h3>Link name (optional)</h3>
          <input
            type="text"
            v-model="newAttachment.title"
            class="url-name-input"
          />
        </div>
        <button class="btn neutral narrow attachment-add">Attach</button>
      </form>
    </div>
  </pop-up>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
import utilService from "@/services/util.service.js";
import popUp from "@/cmps/common/pop-up";
export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      isLoading: false,

      url: null,
      newAttachment: {
        id: null,
        title: "",
        url: null,
        createdAt: null,
      },
    };
  },
  methods: {
    async onUploadImg(ev) {
      try {
        this.isLoading = true;
        const file = ev.target.files[0];
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
      if(!this.url) return;
      this.setAttachmentDetails(res);
      const attachmentsToEdit = [...this.attachments];
      attachmentsToEdit.push(this.newAttachment);
      this.$emit("save-attachments", attachmentsToEdit);
    },
    setAttachmentDetails(res) {
      this.newAttachment.id = utilService.makeId();

      if (this.url) {
        this.newAttachment.url = this.url;
        if (!this.newAttachment.title) {
          this.newAttachment.title = utilService.getFilename(this.url);
        }
        console.log(this.newAttachment.title);
      } else {
        this.newAttachment.url = res.url;
        this.newAttachment.title = `${res.original_filename}.${res.format}`;
      }

      this.newAttachment.createdAt = Date.now();
    },

    togglePopup() {
      this.$emit("toggle-popup", "Attachment");
    },
    toggleAddName() {
      //   this.isLinkUrl = !!this.url;
    },
  },
  components: { popUp },
};
</script>
