<template>
  <div class="bio">
    <img v-if="user.imgUrl" :src="src" :alt="user.name + '\'s Picture'" />
    <h1 class="name">{{ user.name }}</h1>
    <div class="info">
      <a
        v-for="icon in user.social"
        :key="icon.url"
        class="social"
        :href="icon.url"
      >
        <button
          :class="icon.type + ' social-icon'"
          v-html="content(icon.type)"
        ></button>
      </a>
      <h2 class="description">{{ user.description }}</h2>
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