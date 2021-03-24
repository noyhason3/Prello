<template>
  <div class="bio">
    <img
      v-if="user.imgUrl"
      :src="require('@/assets/img/' + this.user.imgUrl)"
      :alt="user.name + '\'s Picture'"
    />
    <div class="info">
      <h1 class="name">{{ user.name }}</h1>

      <div class="body">
        <a
          v-for="icon in user.social"
          :key="icon.url"
          class="social"
          :href="icon.url"
        >
          <button
            :class="icon.type + ' social-icon'"
            v-html="content(icon.type)"
            :style="style(icon.type)"
          ></button>
        </a>

        <div class="description" v-html="user.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  methods: {
    content(type) {
      var char = "&#xf09b;";
      return char;
    },
    style(type) {
      if (type === "git") {
        return {
          color: "#eee",
          background: "#111",
        };
      }
    },
  },
  computed: {
    infoStyle() {
      return this.user.imgUrl ? "top:-70px;" : "";
    },
  },
};
</script>

<style>
</style>