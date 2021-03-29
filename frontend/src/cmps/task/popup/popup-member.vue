<template>
  <pop-up class="popup-member">
    <div slot="header" class="task-popup-header">
      <h2>Members</h2>
      <button @click="togglePopup" class="btn close icon x"></button>
    </div>
    <div slot="main" class="task-popup-main">
      <input
        type="text"
        v-model="searchStr"
        placeholder="Search for members..."
        class="search-member"
        @blur="inputBlurHandler"
      />
      <ul class="clean-list" v-if="memberList">
        <li
          v-for="member in memberList"
          :key="member._id"
          class="member-details"
          :class="{ 'member-selected': isSelected(member._id) }"
          @click="toggleAddMember(member)"
        >
          <member-preview :member="member" />

          <h4 class="member-name">{{ member.fullname }}<span></span></h4>
        </li>
      </ul>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
import memberPreview from "@/cmps/common/member-preview.vue";

export default {
  props: {
    task: Object,
  },
  data() {
    return {
      searchStr: "",
      boardMembers: null,
      taskMembers: null,
    };
  },
  created() {
    // this.taskMembers = JSON.parse(
    //   JSON.stringify(this.$store.getters.currTask.members || [])
    // );
    this.taskMembers = JSON.parse(JSON.stringify(this.task.members)) || [];
  },
  methods: {
    togglePopup() {
      this.$emit("toggle-popup", "Member");
    },
    isSelected(id) {
      const taskMembers = this.taskMembers;
      if (!taskMembers) return;
      return taskMembers.some(({ _id }) => _id === id);
    },
    toggleAddMember(member) {
      if(!this.taskMembers) this.taskMembers=[];
      if (!this.isSelected(member._id)) {
        this.taskMembers.push(member);
        this.$emit("assign-task-member", member);
      } else {
        const memberIdx = this.taskMembers.findIndex(
          ({ _id }) => _id === member._id
        );
        this.taskMembers.splice(memberIdx, 1);
        this.$emit("remove-task-member", member._id);
      }
    },
    inputBlurHandler(ev) {
      if (!ev.relatedTarget) {
        this.$emit("toggle-popup", "Member");
      }
    },
  },
  computed: {
    memberList() {
      const members = this.$store.getters.currBoard.members;
      return members.filter((member) => {
        return member.fullname
          .toLowerCase()
          .includes(this.searchStr.toLowerCase());
      });
    },
  },

  components: {
    popUp,
    memberPreview,
  },
};
</script>
