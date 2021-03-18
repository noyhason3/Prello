<template>
  <section class="board-header">
    <div>{{ board.title }}</div>
    <button>⭐</button>
    <div>
      <ul class="clean-list">
        <li v-for="member in board.members" :key="member.id">
          {{ member.fullname }}
        </li>
      </ul>
    </div>
    <div>Show Menu</div>
  </section>
</template>
<script>

export default {
  props: {
    board: Object,
  },
};
</script>
