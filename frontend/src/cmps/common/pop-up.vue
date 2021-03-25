<template>
  <div
    class="popup"
    ref="container"
    :style="` top:${top}px;`"
  >
    <header>
      <slot name="header"></slot>
    </header>
    <main :style="`max-height:${maxHeight}px; top:${top}px; overflow-y:auto;`">
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
    const curr = this.$refs.container.getBoundingClientRect();
    console.log('curr:', curr)
    if (prev) {
      const top = prev.y + prev.height;
<<<<<<< HEAD
      // this.maxHeight = window.innerHeight - prev.y - 120;
      this.maxHeigh = window.innerHeight - 70;
      const height = window.innerHeight - prev.y - 120;
      if(top+curr.height > window.innerHeight) this.top = 45;
      else this.top = top;
      // this.top = top;
=======
      this.maxHeight = window.innerHeight - top - 20;
      console.log(
        "file: pop-up.vue - line 32 - mounted - this.maxHeight",
        this.maxHeight
      );

      this.top = top;
>>>>>>> e2b02d36f036fe65b83aa3f8a7458072737e0fcd
    }
    // if (prev) {
    //   const top = prev.y + prev.height;
    //   this.maxHeight = window.innerHeight - prev.y;

    //   this.top = top;
    // }
  },
  components: {},
};
</script>
