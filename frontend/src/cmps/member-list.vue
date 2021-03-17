<template>
  <div class="member-list" v-if="members && members.length">
    <div class="member" v-for="member in members" :key="member._id">
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