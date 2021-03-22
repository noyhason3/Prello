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
          description:
            "<p>\n With an interest in both artistic and technical fields from a young age, I strive to combine these two passions to bring the best possible outcome.</p><small>Also known as SQUID13.</small>",
          imgUrl: "creator/anton.jpg",
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