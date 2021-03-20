<template>
  <pop-up>
    <div slot="header" class="task-popup-header">
      <h2>Members</h2>
      <button @click="togglePopup" class="btn close">X</button>
    </div>
    <div slot="main">
      <input type="text" v-model="q" placeholder="Search for members..." />
      <ul class="clean-list" v-if="memberList">
        <li v-for="member in memberList" 
        :key="member._id" 
        class="member-details" 
        :class="{ 'member-selected': isSelected(member._id) }"
        @click="toggleAddMember(member)">
          <member-preview
            :member="member"
            :class="member.color"
            class="member-initials"
          />
          <h4>{{ member.fullname }}<span></span></h4>
          <!-- <button @click="assignMember(member)">Invite</button> -->
          <!-- <div v-if="member.imgUrl" class="user">
            <img :src="member.imgUrl" height="120px" width="120px" />
          </div> -->
        </li>
      </ul>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
import memberPreview from "@/cmps/common/member-preview.vue";

export default {
  data() {
    return {
      q: "",
      boardMembers: null,
      taskMembers: null
    };
  },
  methods: {
    // assignMember(id) {
    //   this.$emit("assign-member", id);
      
    // },
    togglePopup() {
      this.$emit("toggle-popup", "Member");
    },
    getMemeberColor(str) {
      let num = str.split("").reduce((acc, char) => {
        acc += char.charCodeAt(0);
        return acc;
      }, 0);
      return "clr" + ((num % 7) + 2);
    },
    isSelected(id){
        return this.taskMembers.some(({_id}) => _id === id)
    },
    toggleAddMember(member){
      if(!this.isSelected(member._id)) {
        console.log('selected');
        this.taskMembers.push(member)
        this.$emit("assign-task-member", member);
        }
      else{
        console.log('de-selected');
        const memberIdx = this.taskMembers.findIndex(({_id}) => _id === member._id)
        this.taskMembers.splice(memberIdx,1)
        this.$emit("remove-task-member", member._id);
      }
      // this.$emit("close-popup");
    }
  },
  computed: {
    memberList() {
      this.boardMembers = this.$store.getters.currBoard.members;
      this.taskMembers = JSON.parse(JSON.stringify(this.$store.getters.currTask.members || [])) ;
      // console.log('boardMembers:', boardMembers)
      if (!this.taskMembers) return this.boardMembers;
      // let membersToShow = boardMembers.filter((member) => {
      //   return taskmembers.every(({ _id }) => {
      //     return _id !== member._id;
      //   });
      // });
      let membersToShow = this.boardMembers.map((member) => {
        const nameSplit = member.fullname.split(" ");
        const initials = (
          nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
        ).toUpperCase();
        const color = this.getMemeberColor(initials);
        member.color = color;
        member.initials = initials;
        return member;
      });
      console.log("membersToShow:", membersToShow);
      return membersToShow;
    },
  },

  components: {
    popUp,
    memberPreview,
  },
};
</script>
