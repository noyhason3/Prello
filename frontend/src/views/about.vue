<template>
  <section class="about">
    <bio :user="users[0]"></bio>
  </section>
</template>

<script>
import bio from "@/cmps/common/bio.vue";
export default {
  data() {
    return {
      users: [
        {
          name: "Anton Zebnitski",
          description: "Kero kero",
          imgUrl: "",
          social: [{ type: "git", url: "https://github.com/SQUlD13" }],
        },
      ],
    };
  },
  components: { bio },
};
</script>

<style>
</style>