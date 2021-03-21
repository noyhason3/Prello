<template>
   <div v-if="members && members.length">
    <!-- <div class="member-img" v-for="member in members" :key="member.id">
      <img
        v-if="member.imgUrl"
        :src="member.imgUrl"
        height="120px"
        width="120px"
      />
      <div v-else style="height:120px,width:120px">
        {{ member.fullname.charAt(0) }}
      </div> -->

    <!-- </div> -->
    <ul class="clean-list flex member-list">
      <li
        v-for="(member, idx) in members"
        :key="'inits' + idx"
        @click="toggleMemberDetails($event, member)"
      >
        <member-preview
          :member="member"
          @toggle-member-details="toggleMemberDetails"
        />
      </li>
    </ul>
    <popup-member-details
      v-if="isShowMemberDetails"
      @close-member-details="closeMemberDetails"
      @remove-task-member="removeTaskMember"
      :member="selectedMember"
      :isTaskRelated="isTaskRelated"
    />
  </div>
</template>

<script>
import memberPreview from "../common/member-preview.vue";
import popupMemberDetails from "../task/popup/popup-member-details.vue";
export default {
  props: {
    members: Array,
    isTaskRelated:Boolean
  },
  data() {
    return {
      isShowMemberDetails: false,
      selectedMember: null,
    };
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
    removeTaskMember(id){
      this.$emit('remove-task-member',id)
      this.closeMemberDetails()
    }
  },

  components: {
    popupMemberDetails,
    memberPreview,
  },
};
</script>

<style>
</style>