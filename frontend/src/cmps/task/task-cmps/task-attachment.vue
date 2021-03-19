<template>
  <section class="task-attachment-container">
    <h4>Attachments</h4>
    <ul class="clean-list">
      <li
        v-for="attachment in attachmentsToEdit"
        :key="attachment.id"
        class="task-attachment"
      >
        <img
          :src="attachment.url"
          :alt="attachment.url"
          class="attachment-img"
        />
        <div class="attachment-info">
          <h5>{{ attachment.title }}</h5>
          <p>{{ date(attachment.createdAt) }}</p>
          <!-- <button class="btn attachment-action">Comment</button> -->
          <button
            @click="removeAttachment(attachment.id)"
            class="btn attachment-action"
          >
            Delete
          </button>
          <button
            @click="editAttachment(attachment)"
            class="btn attachment-action"
          >
            Edit
          </button>
          <!-- <button class="btn attachment-action">🚃 Make cover</button> TODO
          <button class="btn attachment-action">🚃 Remove cover</button> -->
        </div>
      </li>
    </ul>
    <popup v-if="selectedAttachment">
      <div slot="header">
        <h3>Edit attachment</h3>
      </div>
      <div slot="main">
        <h4>Link name</h4>
        <editable-text
          :isEditFirst="true"
          v-model="selectedAttachment.title"
          @input="updateAttachment"
          @close-textarea="closeEdit"
        />
      </div>
    </popup>
    <!-- TODO: use mmoments library for the when was created-->
  </section>
</template>

<script>
import moment from "moment";
import popup from "@/cmps/common/pop-up.vue";
import editableText from "@/cmps/task/task-cmps/editable-text.vue";

export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      selectedAttachment: null,
    };
  },
  methods: {
    removeAttachment(attachmentId) {
      const attachmentIdx = this.attachmentsToEdit.findIndex(
        ({ id }) => id === attachmentId
      );
      this.attachmentsToEdit.splice(attachmentIdx, 1);
      this.$emit("save-attachments", this.attachmentsToEdit);
    },
    editAttachment(attachment) {
      this.selectedAttachment = { ...attachment };
    },
    updateAttachment() {
      const attachmentIdx = this.attachmentsToEdit.findIndex(
        ({ id }) => id === this.selectedAttachment.id
      );
      this.attachmentsToEdit.splice(attachmentIdx, 1, this.selectedAttachment);
      this.$emit("save-attachments", this.attachmentsToEdit);
      this.closeEdit();
    },
    closeEdit() {
      this.selectedAttachment = null;
    },
    date(timeStamp) {
      return moment(timeStamp).fromNow();
    },
  },
  computed: {
    attachmentsToEdit() {
      return [...this.attachments];
    },
  },
  components: {
    popup,
    editableText,
  },
};
</script>
