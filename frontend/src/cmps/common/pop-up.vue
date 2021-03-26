<template>
  <div class="popup" ref="container" style="outline: none">
    <header ref="header">
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
  // data() {
  //   return {
  //     maxHeight: null,
  //     top: null,
  //   };
  // },
  // mounted() {
  //   const prev = this.$refs.container.previousElementSibling?.getBoundingClientRect();
  //   const curr = this.$refs.container.getBoundingClientRect();
  //   //console.log('curr:', curr)
  //   if (prev) {
  //     const top = prev.y + prev.height;
  //     this.maxHeight = window.innerHeight - 70;
  //     const height = window.innerHeight - prev.y - 120;
  //     if (top + curr.height > window.innerHeight) this.top = 45;
  //     else this.top = top;
  //     // this.top = top;
  //   }
  //   // if (prev) {
  //   //   const top = prev.y + prev.height;
  //   //   this.maxHeight = window.innerHeight - prev.y;

  //   //   this.top = top;
  //   // }
  // },
  mounted() {
    this.$nextTick(() => {
      const containerHeight = this.$refs.container.getBoundingClientRect()
        .height;
      const main = this.$refs.main;
      const footerHeight = this.$refs.footer.getBoundingClientRect().height;
      const headerHeight = this.$refs.header.getBoundingClientRect().height;
      main.style.maxHeight =
        containerHeight - (footerHeight + headerHeight + 28) + "px";
    });
  },
  components: {},
};
</script>
