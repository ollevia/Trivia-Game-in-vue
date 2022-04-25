<template>
  <div class="backdrop">
    <div :class="theme" class="px-3">
      <div class="close w-100 px-1 text-light d-flex justify-content-end">
        <span @click="close">&#10799;</span>
      </div>

      <h2 v-if="title" v-html="title" />

      <span class="icon" v-html="icon" />
      <p class="mt-4" v-html="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    content: String,
    theme: String,
    close: Function,
    volume: Boolean,
  },

  data(props) {
    let audio = new Audio(require("./sounds/wrong.mp3"));
    let icon = ' <i class="fas fa-times"></i>';

    if (props.theme == "correct") {
      icon = ' <i class="fas  fa-check"></i>';
      audio = new Audio(require("./sounds/correct.mp3"));
    }
    if (props.theme == "winner") {
      icon = '<i class="fas fa-hand-peace"></i>';
      audio = new Audio(require("./sounds/winner.mp3"));
    }
    if (this.volume) {
      audio.play();
    }

    return { icon, audio };
  },
});
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(21, 25, 29, 0.6);
}
.backdrop > div {
  color: white;
  padding-bottom: 0.5rem;
  border-radius: 1rem;
  width: 300px;
  margin: 200px auto;
}

.icon {
  font-size: 5rem;
}

h2 {
  margin-top: 1rem;
  font-weight: 800;
  color: white;
}

.close {
  font-size: 2rem;
  cursor: pointer;
}

.wrong {
  background-color: rgb(139, 22, 22);
  animation: shake 0.7s;
}

.correct,
.winner {
  background-color: rgb(25, 117, 25);
}

@keyframes shake {
  0% {
    transform: scale(0);
  }
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }

  10% {
    transform: scale(1);
  }
}

.winner {
  animation: spin 0.6s ease-in;
}

@keyframes spin {
  0% {
    transform: scale(0) rotate(0deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
  }
}

.correct {
  animation: swoop 0.4s;
}
@keyframes swoop {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>