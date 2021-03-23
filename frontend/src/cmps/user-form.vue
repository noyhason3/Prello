<template>
  <form class="user-form" @click="submit">
    <input
      v-if="type === 'signup'"
      type="text"
      placeholder="Full Name..."
      v-model="fullname"
      class="fullname"
      required
    />
    <input
      type="text"
      v-model="username"
      class="username"
      placeholder="User Name..."
      required
    />
    <div class="password">
      <input
        v-if="showPassword"
        type="text"
        v-model="password"
        placeholder="Password..."
        required
      />
      <input
        v-else
        type="password"
        v-model="password"
        placeholder="Password..."
        required
      />
      <button
        @click.prevent="showPassword = !showPassword"
        class="toggle-show-password"
        v-html="showPassContent"
      ></button>
    </div>
    <button type="submit" :class="'submit ' + type">{{ type }}</button>
  </form>
</template>

<script>
export default {
  props: {
    type: String,
  },
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      fullname: "",
    };
  },
  methods: {
    submit(ev) {
      if (
        this.username &&
        this.password &&
        ((this.type === "signup" && this.fullname) || this.type === "login")
      ) {
        this.$emit("submit", this.user);
        ev.preventDefault();
      }
    },
  },
  computed: {
    showPassContent() {
      return this.showPassword ? "&#xf06e" : "&#xf070";
    },
    user() {
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.type === "signup") user.fullname = this.fullname;
      console.log("file: user-form.vue - line 79 - user - user", user);
      return user;
    },
  },
};
</script>

<style>
</style>