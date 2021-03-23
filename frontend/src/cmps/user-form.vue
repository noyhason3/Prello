<template>
  <div class="user-form">
    <input
      type="text"
      v-model="username"
      class="username"
      placeholder="User Name..."
    />
    <div class="password">
      <input
        v-if="showPassword"
        type="text"
        v-model="password"
        placeholder="Password..."
      />
      <input
        v-else
        type="password"
        v-model="password"
        placeholder="Password..."
      />
      <button
        @click="showPassword = !showPassword"
        class="toggle-show-password"
        v-html="showPassContent"
      ></button>
    </div>
    <button @click="submit" class="submit">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      this.$emit("submit", {
        username: this.username,
        password: this.password,
        fullname: this.fullname,
      });
    },
  },
  computed: {
    showPassContent() {
      return this.showPassword ? "&#xf06e" : "&#xf070";
    },
  },
};
</script>

<style>
</style>