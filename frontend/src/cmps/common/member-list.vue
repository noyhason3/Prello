<template>
  <section>
    <h4 v-if="isInTask" class="task-info-headline">Members</h4>
    <div class="member-list-container">
      <div v-if="members && members.length">
        <ul class="clean-list flex member-list">
          <li
            v-for="member in members"
            :key="member._id"
            @click="toggleMemberDetails($event, member)"
          >
            <member-preview
              :member="member"
              @toggle-member-details="toggleMemberDetails"
            />
          </li>
          <li
            v-if="isInTask"
            class="icon plus member-preview"
            @click="openMemberPopup"
          ></li>
        </ul>
        <popup-member-details
          v-if="isShowMemberDetails"
          @close-member-details="closeMemberDetails"
          @remove-task-member="removeTaskMember"
          :member="selectedMember"
          :isTaskRelated="isTaskRelated"
        />
      </div>
      <button
        v-if="!isTaskRelated"
        class="btn white-btn"
        @click="addBoardMember = !addBoardMember"
      >
        <i class="icon plus" style="font-style: normal" />
        Add member
      </button>
      <ul v-if="addBoardMember" class="clean-list user-list">
        <li
          v-for="member in filteredUsers"
          :key="member._id"
          @click="assignBoardMember(member)"
        >
          <member-preview :member="member" />
          <p>{{ member.fullname }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import memberPreview from "../common/member-preview.vue";
import popupMemberDetails from "../task/popup/popup-member-details.vue";

export default {
  props: {
    members: Array,
    isTaskRelated: Boolean,
    isInTask: Boolean,
  },
  data() {
    return {
      isShowMemberDetails: false,
      selectedMember: null,
      addBoardMember: false,
    };
  },
  computed: {
    filteredUsers() {
      const boardUsers = this.$store.getters.currBoard.members;
      const filteredUsers = this.$store.getters.users.filter((user) => {
        return !boardUsers.some((boardUser) => boardUser._id === user._id);
      });
      return filteredUsers;
    },
  },
  methods: {
    toggleMemberDetails(ev, member) {
      ev.stopPropagation();
      this.selectedMember = member;
      this.isShowMemberDetails = !this.isShowMemberDetails;
    },
    closeMemberDetails() {
      this.selectedMember = null;
      this.isShowMemberDetails = false;
    },
    removeTaskMember(id) {
      this.$emit("remove-task-member", id);
      this.closeMemberDetails();
    },
    async assignBoardMember(member) {
      console.log("assigning board member");
      var board = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
      const memberIdx = board.members.findIndex(
        (savedMember) => savedMember._id === member._id
      );
      if (memberIdx < 0) {
        board.members.push(member);
        await this.$store.dispatch({ type: "saveBoard", board });
        this.addBoardMember = false;
      }
    },
    removeBoardMember(id) {
      console.log(
        "file: member-list.vue - line 79 - removeBoardMember - id",
        id
      );
    },
    openMemberPopup(ev) {
      this.$emit("open-member-popup", ev);
    },
  },

  components: {
    popupMemberDetails,
    memberPreview,
  },
};
</script>

<style>
</style>