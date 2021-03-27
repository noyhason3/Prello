<template>
   <div class="board-menu" >
      <header>
        <h2 class="headline">Menu</h2>
        <button @click="toggleBoardMenu" class="btn close icon x"></button>
      </header>
      <main>
        <ul class="clean-list">
          <li class="board-menu-layout" @click="toggleDashboard">
            <div class="icon dashboard"></div>
            <button >Dashboard</button>
          </li>
          <li class="board-menu-layout">
            <div :style="boardStyle" class="thumbnail"></div>
            <button>Change background</button>
          </li>
        </ul>
          <div class="board-menu-layout activity-list">
            <div class="icon list"></div>
            <h3>Activity</h3>
          </div>
      </main>
    </div>
</template>

<script>
export default {
    props:{
        boardStyle:Object,
        board:Object
    },
    methods:{
        toggleBoardMenu(){
            this.$emit('toggle-board-menu');
        },
        toggleDashboard(){
            const boardId = this.board._id;
            console.log('toggling');
            this.$router.push('/board/'+boardId+'/dashboard')
            // this.toggleBoardMenu();
        }
    }
}
</script>

<style>

</style>