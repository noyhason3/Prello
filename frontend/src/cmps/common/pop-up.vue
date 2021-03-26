<template>
  <div class="popup" ref="container" @blur="$emit('close-popup')">
    <header>
      <slot name="header"></slot>
    </header>
    <main :style="`overflow-y:auto;`">
      <slot name="main"> </slot>
    </main>
    <footer>
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
  components: {},
};
</script>
