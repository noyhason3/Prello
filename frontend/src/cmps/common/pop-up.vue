<template>
  <div
    class="popup"
    ref="container"
    :style="`max-height:${maxHeight}px; overflow-y:auto;`"
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
    };
  },
  mounted() {
    console.log(this.$refs.container);
    const top = this.$refs.container.getBoundingClientRect().y;
    this.maxHeight = window.innerHeight - top;
    // console.log(
    //   "file: pop-up.vue - line 25 - mounted - window.innerHeight - top",
    //   window.innerHeight - top
    // );
  },
  components: {},
};
</script>
