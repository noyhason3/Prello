<template>
  <section class="group">
      <task-preview @click.native="openTask(11)"/>
  </section>
</template>

<script>
import taskPreview from '../task/task-preview.vue'
export default {
  methods:{
      openTask(id){
          this.$router.push('/board/101/'+id)
      }
  },
  components: { taskPreview },

}
</script>

<style>

</style>