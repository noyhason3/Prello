<template>
  <pop-up>
      <h3 slot="header">Labels</h3>
    <div slot="main">
      <input type="search" @input="searchLabel">
      <ul class="clean-list">
          <li v-for="label in 5" :key="label.id">
              <div><span>V</span></div><button>🖋</button>
          </li>
      </ul>
    </div>
  </pop-up>
</template>
<script>
import popUp from "@/cmps/pop-up.vue";
export default {
  components: {
    popUp,
  },
};
</script>

<style>
</style>