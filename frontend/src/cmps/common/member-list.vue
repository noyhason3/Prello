<template>
  <div class="member-list" v-if="members && members.length">
    <!-- <pre>{{ members }}</pre> -->
    <!-- <div class="member-img" v-for="member in members" :key="member.id">
      <img
        v-if="member.imgUrl"
        :src="member.imgUrl"
        height="120px"
        width="120px"
      />
      <div v-else style="height:120px,width:120px">
        {{ member.fullname.charAt(0) }}
      </div> -->

    <!-- </div> -->
    <ul class="clean-list ">
      <li v-for="(initials, idx) in memebersInitials" :key="'inits' + idx" class="flex center member-initials" :style="">
        <a class="flex center">{{ initials }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
  },
  computed: {
    memebersInitials() {
      if (!this.members) return;
      const initials = this.members.map((member) => {
        const nameSplit = member.fullname.split(" ");
        return((nameSplit[0].charAt(0)+nameSplit[1].charAt(0)).toUpperCase())
      });
      return initials
    },
  },
};
</script>

<style>
</style>