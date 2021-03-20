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
        v-for="(member, idx) in memebersToShow"
        :key="'inits' + idx"
        class="member-initials"
        @click="toggleMemberDetails($event, member)"
        :class="member.color"
      >
        <a class="flex center">{{ member.initials }}</a>
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
import utilService from "../../services/util.service";
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
    toggleMemberDetails(ev, member) {
      ev.stopPropagation();
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
    memebersToShow() {
      if (!this.members) return;
      const membersToShow = this.members.map((member) => {
        const nameSplit = member.fullname.split(" ");
        const initials = (
          nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
        ).toUpperCase();
        const color = this.getMemeberColor(initials);
        console.log('color:', color)
        // const color = utilService.stringToHslColor(initials, 50, 50);
        member.color = color;
        member.initials = initials;
        return member;
      });
      return membersToShow;
    },
  },
  components: {
    popupMemberDetails,
  },
};
</script>

<style>
</style>