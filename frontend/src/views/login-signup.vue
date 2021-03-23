<template>
  <section class="login-page">
    <h1>Log in :</h1>
    <userForm @submit="logIn" />
    <h1>Sign Up :</h1>
    <input
      type="text"
      placeholder="Full Name..."
      v-model="fullname"
      class="fullname"
    />
    <userForm @submit="signUp" />
  </section>
</template>

<script>
import userForm from "@/cmps/user-form.vue";
export default {
  data() {
    return {
      fullname: "",
    };
  },
  components: { userForm },
  methods: {
    async logIn(userCred) {
      await this.$store.dispatch({ type: "login", userCred });
      this.$router.push("/board");
    },
    async signUp(userCred) {
      userCred.fullname = this.fullname;
      await this.$store.dispatch({ type: "signup", userCred });
      this.$router.push("/board");
    },
  },
};
</script>

<style>
</style>