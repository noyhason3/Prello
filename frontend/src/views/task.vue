<template>
  <section
    class="task-screen"
    v-if="task"
    @dragover.prevent="dragOver"
    @click.stop="closeTask"
  >
    <div class="task" @click.stop>
      <div class="task-cover">
        <div
          v-if="task.style.coverColor"
          class="task-cover-color"
          :style="`background-color: ${task.style.coverColor}`"
        />
        <img
          v-if="task.style.coverImg"
          class="task-cover-img"
          :src="task.style.coverImg"
        />
        <!-- :style="`background-image: url(${task.style.coverImg})`" -->
      </div>
      <div class="header">
        <button
          @click.stop="closeTask"
          class="btn close icon x-bright"
        ></button>
        <div class="task-main-layout headline">
          <div class="icon title"></div>
          <task-title
            v-model="task.title"
            @click.prevent
            @input="saveTask({task, activityType: `${user.fullname}, modified the title of card: '${task.title}'`})"
          />
        </div>
        <p v-if="groupTitle" class="task-secondary-layout group-title">
          in list: {{ groupTitle }}
        </p>
      </div>
      <div class="task-content" @click.stop>
        <task-control
          ref="taskControls"
          :task="task"
          :attachments="attachments"
        />
        <!-- @toggle-popup="togglePopup"
          @set-cover-color="setCoverColor"
          @save-cover-img="saveCoverImg"
          @assign-task-member="assignTaskMember"
          @remove-task-member="removeTaskMember"
          @set-checklist="saveChecklist"
          @set-task-labels="setTaskLabels"
          @save-date="saveDate"
          @save-attachments="saveAttachments" -->

        <div class="task-main">
          <div v-if="task" class="task-info task-secondary-layout">
            <member-list
              v-if="task.members && task.members.length"
              :members="task.members"
              :isTaskRelated="true"
              :isInTask="true"
              @remove-task-member="removeTaskMember"
              @open-member-popup="openMemberPopup"
            />

            <task-label
              v-if="task.labelIds && task.labelIds.length"
              :taskLabelIds="task.labelIds"
              @open-label-popup="openLabelPopup"
            />
            <!-- @set-task-labels="setTaskLabels" -->
            <task-duedate 
            v-if="task.duedate"
             :duedate="task.duedate" 
             @set-completion="setCompletion"/>
            <!-- <div class="task-duedate" v-if="task.duedate">

              <input type="checkbox" />
              {{ date.day }} at {{ date.hour }}
            </div> -->
          </div>
          <div class="task-main-layout headline">
            <div class="icon description"></div>
            <h4 class="description">Description</h4>
          </div>
          <editable-text
            v-model="task.description"
            :type="'description'"
            :elementType="'task'"
            @input="setDescription"
            class="task-secondary-layout task-description-content"
          />

          <task-attachment
            v-if="attachments.length"
            :attachments="attachments"
            @save-attachments="saveAttachments"
          />
          <file-drag-uploader
            v-if="isDragOver"
            :isDragOver="isDragOver"
            :attachments="attachments"
            @save-attachments="saveAttachments"
            @not-drag-over="notDragOver"
            class="drag-uploader"
          />

          <draggable
            v-model="task.checklists"
            group="checklists"
            @start="drag = true"
            @end="
              drag = false;
              saveTask({task, activityType: `${user.fullname}, modified a checklist in card: '${task.title}'`});
            "
            animation="150"
            empty-insert-threshold="50"
            draggable=".checklist-container"
            tag="ul"
            class="clean-list"
          >
            <task-checklist
              v-for="checklist in task.checklists"
              :key="checklist.id"
              class="checklist-container"
              :checklist="checklist"
              @save-todo="saveTodo"
              @delete-checklist="deleteChecklist"
              @toggle-drag="toggleDrag"
              @update-task="saveTask({task, activityType: `${user.fullname}, modified a todo in card: '${task.title}'`})"
            />
            <div class="task-main-layout headline" v-if="activities.length">
              <div class="icon list"></div>
              <h4>Activity</h4>
            </div>
          </draggable>
          <activity-list
            :activities="activities"
            :layoutClass="'task-main-layout'"
            class="activity-list"
          />
        </div>
        <!-- <task-comment /> -->
        <!-- <activity-list /> -->
      </div>
    </div>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import taskControl from "@/cmps/task/task-cmps/task-control.vue";
import taskTitle from "@/cmps/common/editable-title.vue";
import editableText from "@/cmps/common/editable-text.vue";
import memberList from "@/cmps/common/member-list.vue";
import taskChecklist from "@/cmps/task/task-cmps/task-checklist.vue";
import taskLabel from "@/cmps/task/task-cmps/task-label.vue";
//import popupLabel from "@/cmps/task/popup/popup-label.vue";
import taskAttachment from "@/cmps/task/task-cmps/task-attachment.vue";
import fileDragUploader from "@/cmps/common/file-drag-uploader.vue";
import { boardService } from "../services/board.service";
import moment from "moment";
import utilService from "../services/util.service";
import activityList from "@/cmps/common/activity-list.vue";
import taskDuedate from "@/cmps/task/task-cmps/task-duedate.vue";
export default {
  data() {
    return {
      isLabelOpen: false,
      isDragOver: false,
      drag: false,
      popupLeftPos: null,
      groupTitle: null,
      initialHeight: null,
    };
  },
  async created() {
    await this.group();
    const header = document
      .querySelector(".board-header")
      .getBoundingClientRect();
    this.initialHeight = header.top;
  },
  computed: {
    task() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask));
    },
    attachments() {
      return this.task.attachments;
    },
    date() {
      const timestamp = this.task.duedate;
      const day = moment.unix(timestamp).format("MMM D");
      const hour = moment.unix(timestamp).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
    activities() {
      const activities = this.$store.getters.currBoard.activities.filter(
        (activity) => {
          if (activity === null) return;
          return activity.task.id === this.$store.getters.currTask.id;
        }
      );
      if (!activities) return [];
      return activities;
    },
    user(){
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    async group() {
      const group = await this.$store.dispatch({ type: "getGroup" });
      this.groupTitle = group.title;
    },
    setDescription() {
      this.saveTask({ task: this.task, activityType: `${this.user.fullname}, modified a description on card: '${this.task.title}'` });
    },
    // setCoverColor(color) {
    //   this.task.style.coverImg = "";
    //   this.task.style.coverColor = color;
    //   this.saveTask({task:this.task, activityType:'Cover-color was set' });
    // },
    // saveCoverImg(img) {
    //   this.task.style.coverColor = "";
    //   this.task.style.coverImg = img.url;
    //   this.saveTask(this.task);
    // },
    // assignTaskMember(member) {
    //   if (!this.task.members) this.task.members = [];
    //   this.task.members.push(member);
    //   this.saveTask({task:this.task, activityType:'Member was assigned to task' });
    // },
    // removeTaskMember(id) {
    //   const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
    //   if (memberIdx < 0) return;
    //   this.task.members.splice(memberIdx, 1);
    //   this.saveTask({task:this.task, activityType:'Member was removed from task' });

    // },
    // setTaskLabels({ labelIds }) {
    //   this.task.labelIds = labelIds;
    //   this.saveTask({task:this.task, activityType:'Task labels were set' });
    // },
    // saveChecklist(checklist) {
    //   const task = this.task;
    //   this.checklist.id = utilService.makeId();
    //   task.checklists.push(checklist);
    //   this.saveTask({task:this.task, activityType:'Checklist was set' });
    // },
    // TODO - MAYBE WE CAN MERGE THESE TWO TO ONE FUNCTION??
    deleteChecklist(checklistId) {
      const idx = this.task.checklists.findIndex(
        ({ id }) => id === checklistId
      );
      this.task.checklists.splice(idx, 1);
      this.saveTask({ task: this.task, activityType: `${this.user.fullname}, deleted a checklist on card: '${this.task.title}'` });
    },
    saveTodo(checklist) {
      const idx = this.task.checklists.findIndex(
        ({ id }) => id === checklist.id
      );
      this.task.checklists.splice(idx, 1, checklist);
      this.saveTask({
        task: this.task,
        activityType: `${this.user.fullname}, modified a checklist-todo on card: '${this.task.title}'`,
      });
    },
    async saveTask({ task = this.task, activityType }) {
      await this.$store.dispatch({ type: "saveTask", task, activityType });
    },
    closeTask() {
      const boardId = this.$route.params.boardId;
      this.$router.push("/board/" + boardId);
    },
    // togglePopup({ str }) {
    //   var dataStr = `is${str}Open`;
    //   this[dataStr] = !this[dataStr];
    // },
    openLabelPopup(ev) {
      //this.popupLeftPos = buttonLeftPos;
      //this.isLabelOpen = true;
      this.$refs.taskControls.togglePopup("Label", ev);
    },
    // saveDate(timestamp) {
    //   // const timestamp = moment(date, "M/D/YYYY hh:mm a").format("X");
    //   this.task.duedate = timestamp;
    //   this.saveTask(this.task);
    // },
    saveAttachments(attachments) {
      this.task.attachments = attachments;
      console.log(attachments);
      const user = this.$store.getters.loggedinUser;
      this.saveTask({
        task: this.task,
        activityType: `${user.fullname} modified the attachments of task: '${this.task.title}'`,
      });
    },
    dragOver(ev) {
      if (this.drag) return;
      this.isDragOver = true;
    },
    notDragOver() {
      this.isDragOver = false;
    },
    toggleDrag(isDrag) {
      this.drag = isDrag;
    },
    setDrag(isDrag) {
      this.dragTodo = isDrag;
      this.$emit("toggle-drag", isDrag);
    },
    removeTaskMember(id) {
      console.log("memberIdx:");
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      this.task.members.splice(memberIdx, 1);
      this.saveTask(this.task);
    },
    openMemberPopup(ev) {
      this.$refs.taskControls.togglePopup("Member", ev);
    },
    setCompletion(isComplete){
      this.task.duedate.isComplete = isComplete;
      this.saveTask(this.task);
    }
  },
  components: {
    draggable,
    taskControl,
    taskTitle,
    memberList,
    taskChecklist,
    editableText,
    taskLabel,
    taskAttachment,
    fileDragUploader,
    boardService,
    activityList,
    taskDuedate
  },
};
</script>

