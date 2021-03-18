<template>
  <pop-up>
    <div slot="main">
      <input type="text" v-model="q" placeholder="Search for members..." />
      <ul class="members" v-if="members && members.length">
        <div v-for="member in members" :key="member._id">
          <button @click="assignMember(member)">Invite</button>
          <div v-if="member.imgUrl" class="user">
            <img :src="member.imgUrl" height="120px" width="120px" />
            <h2>{{ member.fullname }}</h2>
          </div>
        </div>
      </ul>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
export default {
  data() {
    return {
      q: "",
      members: this.$store.getters.currBoard.members || [],
    };
  },
  methods: {
    assignMember(id) {
      this.$emit("assign-member", id);
      this.$emit("close-popup");
    },
  },
  components: { popUp },
};
</script>
