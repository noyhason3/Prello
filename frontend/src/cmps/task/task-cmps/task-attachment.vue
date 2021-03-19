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
import attachment from "./attachment.vue";
export default {
  props: {
    attachments: Array,
  },
    created(){
        console.log('atts created');
    },
  methods: {

  },
  components: {
    attachment,
  },
};
</script>
