<template>
  <pop-up>
    <h3 slot="header">Labels</h3>
    <div slot="main">
      <input type="search" @input="searchLabel" />
      <ul class="clean-list">
        <li v-for="label in labels" :key="label.id" class="flex align-center label-preview">
          <div :style="{ 'background-color': label.color }" class="label-color">
            <button class="btn label">{{ label.title }}</button>
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
      console.log("FINISH ME!!! (search label)");
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