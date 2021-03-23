<template>
  <section class="login-page">
    <div class="login">
      <h1>Log in :</h1>
      <userForm @submit="logIn" :type="'login'" />
    </div>
    <div class="signup">
      <h1>Sign Up :</h1>
      <userForm @submit="signUp" :type="'signup'" />
    </div>
  </section>
</template>

<script>
import userForm from "@/cmps/user-form.vue";
export default {
  components: { userForm },
  methods: {
    async logIn(userCred) {
      await this.$store.dispatch({ type: "login", userCred });
      this.$router.push("/board");
    },
    async signUp(userCred) {
      await this.$store.dispatch({ type: "signup", userCred });
      this.$router.push("/board");
    },
  },
};
</script>

<style>
</style>