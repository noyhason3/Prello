<template>
  <div
    class="popup"
    ref="container"
    :style="`max-height:${maxHeight}px; top:${top}px; overflow-y:auto;`"
  >
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"> </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxHeight: null,
      top: null,
    };
  },
  mounted() {
    const prev = this.$refs.container.previousElementSibling?.getBoundingClientRect();
    if (prev) {
      const top = prev.y + prev.height;
      this.maxHeight = window.innerHeight - top - 20;
      console.log(
        "file: pop-up.vue - line 32 - mounted - this.maxHeight",
        this.maxHeight
      );

      this.top = top;
    }
  },
  components: {},
};
</script>
