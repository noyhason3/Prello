<template>
  <div class="pop-up">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main">
      </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
    components:{
    }
};
</script>

<style>
 .pop-up{
   position:fixed;
 }


</style>