<template>
  <div v-if="members && members.length">
    <!-- <pre>{{ members }}</pre> -->
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
        v-for="(member, idx) in membersToShow"
        :key="'inits' + idx"
        class="member-initials"
        @click="toggleMemberDetails($event, member)"
        :class="member.color"
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
      :member="selectedMember"
    />
  </div>
</template>

<script>
import memberPreview from "../common/member-preview.vue";
import popupMemberDetails from "../task/popup/popup-member-details.vue";
export default {
  props: {
    members: Array,
  },
  data() {
    return {
      isShowMemberDetails: false,
      selectedMember: null,
    };
  },
  methods: {
    toggleMemberDetails(member) {
      this.selectedMember = member;
      this.isShowMemberDetails = !this.isShowMemberDetails;
    },
    closeMemberDetails() {
      this.selectedMember = null;
      this.isShowMemberDetails = false;
    },
    getMemeberColor(str) {
      let num = str.split("").reduce((acc, char) => {
        acc += char.charCodeAt(0);
        return acc;
      }, 0);
      return "clr" + ((num % 7) + 2);
    },
  },
  computed: {
    membersToShow() {
      if (!this.members) return;
      const membersToShow = this.members.map((member) => {
        const nameSplit = member.fullname.split(" ");
        const initials = (
          nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
        ).toUpperCase();
        const color = this.getMemeberColor(initials);
        // console.log("color:", color);
        member.color = color;
        member.initials = initials;
        return member;
      });
      // console.log("membersToShow:", membersToShow);
      return membersToShow;
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