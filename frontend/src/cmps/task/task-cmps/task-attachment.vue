<template>
  <section class="task-attachment-container">
    <div class="task-main-layout headline">
      <div class="icon attachment"></div>
      <h4>Attachments</h4>
    </div>
    <ul class="clean-list">
      <li
        v-for="attachment in attachmentsToEdit"
        :key="attachment.id"
        class="task-secondary-layout task-attachment"
      >
        <img
          :src="attachment.url"
          :alt="attachment.url"
          class="attachment-img"
        />
        <div class="attachment-info">
          <div>
            <h5>{{ attachment.title }}</h5>
            <p>Added {{ date(attachment.createdAt) }}</p>
            <!-- <button class="btn attachment-action">Comment</button> -->
          </div>
          <div>
            <button
              @click="removeAttachment(attachment.id)"
              class="btn attachment-action"
            >
              Delete</button
            >-
            <button
              @click="editAttachment(attachment, $event)"
              class="btn attachment-action"
            >
              Edit
            </button>
          </div>
          <!-- <button v-if="!isCover()" class="btn attachment-action">🚃 Make cover</button> TODO
          <button v-else class="btn attachment-action">🚃 Remove cover</button> -->
        </div>
      </li>
    </ul>
    <button class="btn neutral task-secondary-layout">Add an attachment</button>
    <popup
      v-if="selectedAttachment"
      class="attachment-edit"
      :style="{ 'max-height': 'fit-content' }"
      ref="popup"
    >
      <div slot="header" class="task-popup-header">
        <h2>Edit attachment</h2>
        <button @click="closeEditAttachment" class="btn close icon x"></button>
      </div>
      <div slot="main" class="attachment-edit-main">
        <h3>Link name</h3>
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
import editableText from "@/cmps/common/editable-text.vue";

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
    editAttachment(attachment, ev) {
      this.selectedAttachment = { ...attachment };
      const rect = ev.target.getBoundingClientRect();
      console.log(
        "file: task-attachment.vue - line 93 - editAttachment - rect",
        rect
      );
      this.$nextTick(() => {
        const element = this.$refs.popup.$el;
        element.style.top = rect.bottom + "px";
        element.style.left = rect.left + "px";
      });
    },
    closeEditAttachment() {
      this.selectedAttachment = null;
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
      return moment(+timeStamp).fromNow();
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
