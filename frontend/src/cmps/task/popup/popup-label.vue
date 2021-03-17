<template>
  <pop-up>
    <h3 slot="header">Labels</h3>
    <div slot="main">
      <input type="search" @input="searchLabel" />
      <ul class="clean-list">
        <li v-for="label in boardLabels" :key="label.id" class="flex align-center label-preview">
          <div :style="{ 'background-color': label.color }" class="label-color">
            <button @click="toggleSelectLabel(label.id)" class="btn label">{{ label.title }}</button>
          </div>
            <button>🖋</button>
        </li>
      </ul>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/pop-up.vue";
export default {
    data(){
        return{
            labels: this.$store.getters.currBoard.labels,
            }
    },
  methods: {
    searchLabel() {
      console.log("FINISH ME!!! (search label)");
    },
    toggleSelectLabel(labelId){
        // console.log('curr task labels',this.$store.getters.currTask.labelIds);
        if(this.taskLabelsEdit.includes(labelId)){ 
            labelIdx = this.taskLabels.findIndex(label => label.id === labelId)
            this.taskLabelsEdit.splice(labelIdx, 1)
            // console.log(this.taskLabelsEdit);
            return
            }
        this.taskLabelsEdit.push(labelId)
        this.$emit({type:'add-task-labels', labels:this.taskLabelsEdit})
        // console.log(this.taskLabelsEdit)
    }
  },
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabelsEdit(){
        console.log(this.$store.getters.currTask.labelIds);
        return [...this.$store.getters.currTask.labelIds]
    }
  },
  components: {
    popUp,
  },
};
</script>