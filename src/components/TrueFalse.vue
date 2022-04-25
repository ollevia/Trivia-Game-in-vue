<template>
  <b-container
    style="max-width: 24rem"
    class="p-5 mx-auto my-5 bg-light border rounded border-2 shadow-lg"
  >
    <div class="text-dark">
      <h3>{{ player.name }}, true or false?</h3>
    </div>

    <p class="text-dark" style="min-height: 100px" v-html="quiz.question" />

    <div class="d-flex justify-content-between">
      <b-button
        @click="toggly('True', quiz.correct_answer)"
        class="trueButton me-1 w-50"
        >true</b-button
      >
      <!-- pass players answer and the correct answer -->
      <b-button
        @click="toggly('False', quiz.correct_answer)"
        class="falseButton ms-1 w-50"
        >false</b-button
      >
    </div>

    <Popup
      v-if="displayPop"
      @click="next"
      :volume="volume"
      :title="result.toUpperCase() + '!'"
      :content="
        'the correct answer was <b>' +
        quiz.correct_answer.toUpperCase() +
        '</b>'
      "
      :theme="result"
    />
  </b-container>
</template>



<script lang="ts">
import { defineComponent } from "vue";
import Popup from "../components/Popup.vue";

export default defineComponent({
  props: {
    quiz: Object,
    next: Function,
    player: Object,
    rounds: Number,
    currentRound: Number,
    volume: Boolean,
  },
  components: {
    Popup,
  },

  data() {
    return {
      //for display of popup
      displayPop: false as Boolean,
      result: "WRONG!" as String,
      i: 1,
    };
  },

  methods: {
    toggly(playerAnswer: Number, correctAnswer: Number) {
      //toggle display of result-popup
      this.displayPop = !this.displayPop;

      //compare players answer to the correct answer.
      if (playerAnswer == correctAnswer) {
        this.result = "correct";
        //call newPoint and add point to currentPlayer.
        this.$emit("newPoint", true);
      } else {
        this.result = "wrong";
        this.$emit("newPoint", false);
      }
    },
  },
});
</script>

<style scoped>
.trueButton {
  background-color: #44973f;
  box-shadow: inset 1px 6px 12px rgb(72, 185, 72), inset -1px -10px 5px darkgreen,
    1px 2px 1px black;
  border: black;
}

.trueButton:hover {
  background-color: rgb(83, 190, 83);
}

.falseButton {
  border: black;
  background-color: #b94355;
  box-shadow: inset 1px 6px 12px rgb(230, 101, 101),
    inset -1px -10px 5px rgb(100, 0, 0), 1px 2px 1px black;
}

.falseButton:hover {
  background-color: #ed677a;
}

.falseButton,
.trueButton {
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  border-radius: 4rem;
  height: 5rem;
}
</style>
