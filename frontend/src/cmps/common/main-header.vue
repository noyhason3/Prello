<template>
  <header class="main-header">
    <main-nav />
    <img src="@/assets/img/logo.png" class="logo"/>
    <member-preview  :member="member"/>
  </header>
</template>

<script>
import mainNav from "@/cmps/common/main-nav";
import memberPreview from '@/cmps/common/member-preview.vue'

export default {
  data() {
    return {
      member:null,
    };
  },
    created(){
    this.member= this.$store.getters.loggedinUser;
    console.log('this.member:', this.member)
  },
  components: {
    mainNav,
    memberPreview
  },
};
</script>

<style>
</style>