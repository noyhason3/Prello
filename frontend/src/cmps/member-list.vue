<template>
  <div class="member-list" v-if="members && members.length">
    <!-- <pre>{{ members }}</pre> -->
    <div class="member-img" v-for="member in members" :key="member._id">
      <img
        v-if="member.imgUrl"
        :src="member.imgUrl"
        height="120px"
        width="120px"
      />
      <div v-else style="height:120px,width:120px">
        {{ member.fullname.charAt(0) }}
      </div>
      <!-- {{ member }} -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
  },
};
</script>

<style>
</style>