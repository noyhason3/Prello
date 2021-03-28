<template>
  <a class="flex center member-preview" :class="colorClassByInitials">
    {{ memberInitials }}
  </a>
  <!--TODO: <img
        v-if="member.imgUrl"
        :src="member.imgUrl"
        height="120px"
        width="120px"
      /> -->
</template>

<script>
export default {
  props: {
    member: Object,
  },
  methods: {
    toggleMemberDetails() {
      this.$emit("toggle-member-details", { ev, member });
    },
  },
  computed: {
    memberInitials() {
      if (this.member.username === "Guest") return "GU";
      const nameSplit = this.member.fullname.split(" ");
      var initials = nameSplit
        .map((word) => {
          return word.charAt(0).toUpperCase();
        })
        .join("");
      // const initials = (
      //   nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
      // ).toUpperCase();
      return initials;
    },
    colorClassByInitials() {
      const initials = this.memberInitials;
      let num = initials.split("").reduce((acc, char) => {
        acc += char.charCodeAt(0);
        return acc;
      }, 0);
      return "clr" + ((num % 7) + 2);
    },
  },
};
</script>

