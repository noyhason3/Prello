<template>
      <a class="flex center member-preview">{{ member.initials }}</a>
</template>

<script>
export default {
    props:{
        member:Object
    },
    created(){
      // console.log('this.member:', this.member)
    },
    methods:{
      toggleMemberDetails(){
        this.$emit('toggle-member-details', {ev, member})
      }
    }
};
</script>

