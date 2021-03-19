<template>
  <section class="task-attachment">
    <h4>Attachments</h4>
    <ul>
      <li v-for="attachment in attachmentsToEdit" :key="attachment.id">
        <img :src="attachment.url" alt="" />
        <h5>{{ attachment.title }}</h5>
        <p>{{ attachment.createdAt }}</p>
        <button class="btn attachment-action">Comment</button>
        <button
          @click="removeAttachment(attachment.id)"
          class="btn attachment-action"
        >
          Delete
        </button>
        <button class="btn attachment-action">Edit</button>
        <button class="btn attachment-action">🚃 Make cover</button>
      </li>
    </ul>
    <popup v-if="true">
      <div slot="header">
        <h3>Edit attachment</h3>
      </div>
      <div slot="main"></div>
    </popup>
    <!-- TODO: use mmoments library for the when was created-->
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
export default {
  props: {
    attachments: Array,
  },
  methods: {
    removeAttachment(attachmentId) {
      const attachmentIdx = this.attachmentsToEdit.findIndex(
        ({ id }) => id === attachmentId
      );
      this.attachmentsToEdit.splice(attachmentIdx, 1);
      this.$emit("save-attachments", this.attachmentsToEdit);
    },
  },
  computed: {
    attachmentsToEdit() {
      return [...this.attachments];
    },
  },
  components: {
    popup,
  },
};
</script>
