<template>
  <div class="board-menu-popup">
    <header ref="header">
      <button @click="toggleBoardMenu" class="btn close icon x"></button>
      <slot name="header"></slot>
    </header>
    <main ref="main">
      <slot name="main"> </slot>
    </main>
    <footer ref="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    toggleBoardMenu() {
      this.$emit("toggle-board-menu");
    },
  },
};
</script>

<style>
</style>