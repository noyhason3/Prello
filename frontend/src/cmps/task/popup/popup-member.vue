<template>
  <pop-up>
    <div slot="header" class="task-popup-header">
      <h2>Members</h2>
      <button @click="togglePopup" class="btn close">X</button>
    </div>
    <div slot="main">
      <input type="text" v-model="q" placeholder="Search for members..." />
      <ul class="members" v-if="members && members.length">
        <li v-for="member in memberList" :key="member._id">
          <button @click="assignMember(member)">Invite</button>
          <div v-if="member.imgUrl" class="user">
            <img :src="member.imgUrl" height="120px" width="120px" />
          </div>
          <h2>{{ member.fullname }}</h2>
        </li>
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
    togglePopup() {
      this.$emit("toggle-popup", "Member");
    },
  },
  computed: {
    memberList() {
      const boardMembers = this.$store.getters.currBoard.members;
      const taskmembers = this.$store.getters.currTask.members;
      if (!taskmembers) return boardMembers;
      return boardMembers.filter((member) => {
        taskmembers.every(({ _id }) => _id !== member._id);
      });
    },
  },
  components: { popUp },
};
</script>
