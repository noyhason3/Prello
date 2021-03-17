<template>
      <pop-up>
          <h2 slot="header"></h2>
          <ul slot="main">
              <li v-for="member in members" :key="member._id">
                  member.name
              </li>
          </ul>
      </pop-up>
</template>

<script>
export default {

}
</script>

<style>

</style>