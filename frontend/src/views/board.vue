<template>
  <section class="board">
      <group/> 
      <router-view />
  </section>
</template>

<script>
import group from '../cmps/board/group.vue'
export default {
  components: { group },

}
</script>

<style>

</style>