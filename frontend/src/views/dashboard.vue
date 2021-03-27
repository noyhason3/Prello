<template>
  <section v-if="board" class="dashboard-screen" @click.stop="closeDashboard">
    <button class="close btn icon x-bright"></button>
    <task-per-label
      :labels="Object.keys(taskPerLabel)"
      :data="Object.values(taskPerLabel)"
      :colors="labelColors"
      :options="options"
    />
    <task-per-member
      :labels="Object.keys(taskPerMember)"
      :data="Object.values(taskPerMember)"
      :colors="labelColors"
      :options="options"
    />
    <todo-per-member
      :labels1="Object.keys(taskPerLabel)"
      :data1="Object.values(taskPerLabel)"
      :labels2="Object.keys(taskPerMember)"
      :data2="Object.values(taskPerMember)"
      :colors="labelColors"
      :options="options"
    />
  </section>
</template>

<script>
import taskPerLabel from "@/cmps/board/task-per-label";
import taskPerMember from "@/cmps/board/task-per-member";
import todoPerMember from "@/cmps/board/todo-complete-per-member";
export default {
  data() {
    return {
      options: {
        legend: {
          labels: {
            fontColor: "#ffffff",
          },
        },
      },
    };
  },

  methods: {
    todosCompleteperMember() {},
    tasksPerMember() {},
    closeDashboard() {
      this.$router.push("/board/" + this.board._id);
    },
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
    labelColors() {
      return this.board.labels.map(({ color }) => color);
    },
    taskPerLabel() {
      const taskPerLabelMap = this.board.labels.reduce((map, label) => {
        const totalTaskCount = this.board.groups.reduce((sum, { tasks }) => {
          const taskCount = tasks.filter((task) => {
            if (!task.labelIds) return [];
            return task.labelIds.includes(label.id);
          }).length;

          sum += taskCount;
          return sum;
        }, 0);

        if (!map[label.title]) map[label.title] = 0;
        map[label.title] += totalTaskCount;
        return map;
      }, {});

      //   console.log("taskPerLabelMap:", taskPerLabelMap);
      console.log("keys", Object.keys(taskPerLabelMap));
      console.log("values:", Object.values(taskPerLabelMap));
      return taskPerLabelMap;
    },
    taskPerMember() {
      const taskPerMemberMap = this.board.members.reduce((map, member) => {
        const totalTaskCount = this.board.groups.reduce((sum, { tasks }) => {
          const taskCount = tasks.filter((task) => {
            if (!task.members) return false;
            return task.members.some(({ _id }) => _id === member._id);
          }).length;

          sum += taskCount;
          return sum;
        }, 0);

        if (!map[member.username]) map[member.username] = 0;
        map[member.username] += totalTaskCount;
        return map;
      }, {});
      console.log("taskPerMemberMap:", taskPerMemberMap);
      return taskPerMemberMap;
    },
  },
  components: {
    taskPerLabel,
    taskPerMember,
    todoPerMember,
  },
};
</script>
