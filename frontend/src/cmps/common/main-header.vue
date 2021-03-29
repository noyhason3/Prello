<template>
  <header class="main-header" :class="{'img-bg': isBoardOpen}">
    <main-nav />
    <member-preview v-if="memberFullname" :member="member" />
    <img src="@/assets/img/logo.png" class="logo" />
  </header>
</template>

<script>
import mainNav from "@/cmps/common/main-nav";
import memberPreview from "@/cmps/common/member-preview.vue";

export default {
  data() {
    return {
      member: null,
      isBoardOpen:false
    };
  },
  computed: {
    memberFullname() {
      this.member = this.$store.getters.loggedinUser;
      return this.member.fullname;
    },
  },
    watch: {
    '$route.params.boardId'(boardId) {
      if(boardId) return this.isBoardOpen = true;
      this.isBoardOpen =false;
    },
  },
  components: {
    mainNav,
    memberPreview,
  },
};
</script>
