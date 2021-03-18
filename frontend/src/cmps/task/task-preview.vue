<template>
  <section class="task-preview" v-if="task">
    <button @click="removeTask">X</button>
    <h2 class="task-title">{{ task.title }}</h2>
  </section>
</template>

<script>
import memberList from '@/cmps/common/member-list.vue'
// import memberList from '@/cmps/task/member-list.vue'
// import memberList from '@/cmps/common/member-list.vue'
// import memberList from '@/cmps/common/member-list.vue'
export default {
  props: {
    task: Object,
  },
  methods:{
    removeTask(e){
      e.stopPropagation();
      this.$emit('remove-task', this.task.id)
    }
  },
  computed:{
    isTaskCover(){
      return this.task.cover
    },
    isTaskLabels(){
      return this.task.labels.length
    },
    isTaskDescription(){
      return this.task.description
    },
    isTaskAttachment(){
      return this.task.attachment.length
    },
    isTaskMembers(){
      return this.task.members.length
    }
  }
};
</script>

<style>
</style>