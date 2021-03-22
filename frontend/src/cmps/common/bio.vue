<template>
  <div class="bio">
    <img v-if="user.imgUrl" :src="src" :alt="user.name + '\'s Picture'" />
    <div class="info">
      <h1 class="name">{{ user.name }}</h1>
      <h2 class="description">{{ user.description }}</h2>
    </div>
    <div v-for="icon in user.social" :key="icon.url" class="social">
      <a
        :href="icon.url"
        :class:="icon.type"
        class="social-icon"
        v-html="content(icon.type)"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      src() {
        return this.user.imgUrl.startsWith("http")
          ? "@/assets/img/" + this.user.name
          : this.user.imgUrl;
      },
    };
  },
  methods: {
    content(type) {
      var char = "&#xf09b;";
      return char;
    },
  },
};
</script>

<style>
</style>