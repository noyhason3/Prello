<template>
  <section class="task-attachment">
    <img :src="attachment" alt="" />
    <h5>Attachment title</h5>
    <p>Added yesterday</p>
    <button class="btn attachment-action">Comment</button>
    <button class="btn attachment-action">Delete</button>
    <button class="btn attachment-action">Edit</button>
    <button class="btn attachment-action">🚃 Make cover</button>

    <!-- TODO: use mmoments library for the when was created-->
  </section>
</template>

<script>
export default {
  props: {
    attachment: String,
  },
  created(){
      console.log('attachment:', this.attachment)
  },
  components: {},
};
</script>
