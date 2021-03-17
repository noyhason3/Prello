<template>
  <pop-up>
    <h2 slot="header">Add Checklist</h2>
    <div slot="main">
      <h3>Title</h3>
      <input type="text" name="title" id="title" />
      <!-- <h3>Copy Items From...</h3>
      <input type="text" name="" id="" /> -->
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/pop-up";
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  components: { popUp },
};
</script>
