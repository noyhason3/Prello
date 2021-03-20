<template>
  <section class="board-header">
    <div>{{ board.title }}</div>
    <button>⭐</button>
    <div class="board-header-members">
      <member-list 
      :members="board.members" 
      :isTaskRelated="false"/>
    </div>
    <div>Show Menu</div>
  </section>
</template>
<script>
import memberList from '../common/member-list.vue'
export default {
  props: {
    board: Object,
    
  },
  components:{
    memberList
  }
};
</script>
