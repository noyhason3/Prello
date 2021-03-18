<template>
  <ul>
    <li v-for="label in taskLabels" :key="label.id" :style="{'background-color':label.color}">{{label.title}}</li>
  </ul>
</template>

<script>
export default {
    props:{
        taskLabelIds:Array
    },
    computed:{
        boardLabels(){
            return this.$store.getters.currBoard.labels
        },
        taskLabels(){
            console.log('boardLabels',this.boardLabels);
            return this.boardLabels.map(({id })=> {
                this.taskLabelIds.includes(id)})
        }
    }
}
</script>
