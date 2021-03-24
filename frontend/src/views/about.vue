<template>
  <section class="about">
    <div v-for="(user, idx) in users" :key="idx" class="creator">
      <bio :user="user"></bio>
    </div>
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
        {
          name: "Ifat Braslavi",
          description:
            "<p>\n Formerly a senior BIM model manager in the construction industry. Started coding out of interest and the need for efficiency and better tools. On the way fell inlove with code.",
          imgUrl: "creator/ifat.jpg",
          social: [{ type: "git", url: "https://github.com/ifatBR" }],
        },
        {
          name: "Noy Hason",
          description:
            "<p>\n  A junior Fullstack developer who likes to challenge my brain trying my way in the computers world everyday by hard-working & high-thinking and enjoy every second of coding!",
          imgUrl: "creator/noy.jpg",
          social: [{ type: "git", url: "https://github.com/noyhason3" }],
        },
      ],
    };
  },
  components: { bio },
};
</script>

<style>
</style>


                 