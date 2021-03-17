<template>
  <section class="task-checklist">
    <ul>
      <li v-for="checklist in task.checklists" :key="checklist.id" class="clean-list">
        <checklist-header
          >✅ {{ checklist.title }} <button>Delete</button>
        </checklist-header>

      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
};
</script>

<style>
</style>