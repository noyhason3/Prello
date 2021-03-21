<template>
  <pop-up class="member-details" >
    <div slot="main">
      <button @click="closeMemberDetails" class="btn close">X</button>
      <div class="member-details-container">
          <member-preview :member="member"/>
        <div>
          <h2>{{ member.fullname }}</h2>
          <h3>@{{ member.username }}</h3>
        </div>
      </div>
          <button
            v-if="isTaskRelated"
            @click="removeTaskMember($event, member._id)"
            class="btn remove"
          >
            Remove from task
          </button>
    </div>
  </pop-up>
</template>

<script>
import popUp from "@/cmps/common/pop-up";
import memberPreview from "@/cmps/common/member-preview.vue";

export default {
  props: {
    member: Object,
    isTaskRelated: Boolean,
  },
  methods: {
    closeMemberDetails(ev) {
      ev.stopPropagation();
      this.$emit("close-member-details");
    },
    removeTaskMember(ev, id) {
      ev.stopPropagation();
      this.$emit("remove-task-member", id);
    },
  },
  components: {
    popUp,
    memberPreview
  },
};
</script>
