<template>
  <div>
    <div
      @click="closeBoardPopup"
      class="create-board-screen"
      :class="{ 'add-board': isAddBoard }"
    ></div>
    <div v-if="isAddBoard" class="popup-create-board">
      <form @submit.prevent="createNewBoard">
        <div class="new-board-info">
          <div class="title-container" :style="selectedStyle.style">
            <input
              type="text"
              placeholder="Add board title"
              v-model="boardToEdit.title"
              class="title"
            />
            <button @click="closeBoardPopup" class="btn close">X</button>
          </div>
          <ul class="clean-list bgStyle-list">
            <li
              v-for="(style, idx) in bgStyles"
              @click="selectStyle(style)"
              :key="'style' + idx"
              class="bgStyle"
              :class="{ selected: isSelected(style.id) }"
              :style="style.style"
            ></li>
          </ul>
        </div>
        <button class="btn create-board" :class="{ gray: !boardToEdit.title }">
          Create board
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        boardToEdit:Object,
    },
  data() {
    return {
      selectedStyle: null,

      imgs: [
        { id: "i101", value: "1.jpg" },
        { id: "i102", value: "2.jpg" },
        { id: "i103", value: "3.jpg" },
        { id: "i104", value: "4.jpg" },
        { id: "i105", value: "5.jpg" },
      ],
      colors: [
        { id: "c101", value: "#C10BB3" },
        { id: "c102", value: "#03A7BE" },
        { id: "c103", value: "#003152" },
        { id: "c104", value: "#8BCB8A" },
      ],
    };
  },
};
</script>

<style>
</style>