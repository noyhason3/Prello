<template>
  <pop-up>
    <h3 slot="header">Labels</h3>
    <div slot="main">
      <form @submit.prevent=""></form>
      <input type="search" @input="searchLabel" />
      <ul class="clean-list">
        <li v-for="label in labels" :key="label.id" class="flex label-preview" 
        >
          <div :style="{ 'background-color': label.color }">
            <h4 class="labelTitle">{{ label.title }}</h4>
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
  methods: {
    searchLabel() {
      console.log("FINISH ME!!! (searcch label)");
    },
  },
  computed: {
    labels() {
      return this.$store.getters.currBoard.labels;
    },
  },
  components: {
    popUp,
  },
};
</script>



            // "id": "l101",
            // "title": "Done",
            // "color": "#61bd4f"