<template>
      <a class="flex center">{{ member.initials }}</a>
</template>

<script>
export default {
    props:{
        member:Object
    },
    created(){
      // console.log('this.membersToShow:', this.member)
    },
    methods:{
      toggleMemberDetails(){
        this.$emit('toggle-member-details', {ev, member})
      }
    }
};
</script>

