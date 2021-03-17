<template>
  <section class="task-description">
    <p @click="toggleEditDescription">{{taskDescription}}</p>
  </section>
</template>

<script>
export default {
  props: {
    taskDescription: String,
    task: Object,
  },
  data(){
    return{
      isEditDescription:false
    }
  },
  created(){
    console.log('task dsescription:', this.taskDescription)
    console.log('task:', this.task)
  },
  methods:{
    toggleEditDescription(){
      this.isEditDescription = !this.isEditDescription
    }
  }

}
</script>

<style>

</style>