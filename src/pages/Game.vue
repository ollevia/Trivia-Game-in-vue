<template>
  <div style="max-width: 600px" class="container pt-5 pb-1">
    <button
      class="btn"
      @click="toggleSound"
      style="position: absolute;
      height: 2.6rem;
      top: 1rem;
      right: 2rem;
      border-color: black;
      border-radius: 2rem;
  background-color: #237AA9;"
      v-html="volume == true ? soundOn : soundOff"
    ></button>
    <h1 class="title mx-auto">TRUE or FALSE?</h1>
    <hr class="my-0" />

    <div
      class="mx-auto d-flex align-items-baseline justify-content-between"
    >
      <b-nav align="center" class="d-flex align-items-center">
        <b-nav-item @click="endGame(false)">SETUP</b-nav-item>
      </b-nav>
      <p class="text-light" v-if="started == true">
        Round: <b> {{ currentRound }}/{{ rounds }}</b>
      </p>
    </div>
  <Loader v-if="loading"/>

  <transition name="toast">
    <Toasts v-if="woops" :content="'add players first'" />
  </transition>

  <div class="w-100">
    <transition name="quiz">
      <TrueFalse
        v-if="started"
        :key="i"
        :volume="volume"
        :quiz="quiz[i]"
        :next="next"
        :player="players[j]"
        @newPoint="newPoint"
      />
    </transition>

    <!--dont do transition for Players-component if game is finished. It looks laggy bc of the transition of Popup inside of Players.-->
    <transition :name="finished === true ? '' : 'setup'">
      
      <Players
        ref="playerComponent"
        v-if="!started && !loading"
        :setup="setup"
        :volume="volume"
        :btnText="btnText"
        :loadGame="loadGame"
        :finished="finished"
        :closePop="closeFinishedPop"
      />
    </transition>
  </div>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Players from "../components/Players.vue";
import TrueFalse from "../components/TrueFalse.vue";
import Toasts from "../components/Toasts.vue";
import Loader from "../components/Loader.vue";

export default defineComponent({
  components: {
    TrueFalse,
    Players,
    Toasts,
    Loader,
  },

  data() {
    let btnText = "PLAY";
    //player names and points
    let players = [] as any;

    //tells if game has started
    let started = ref(false);
    let setup = ref(true);

    //turns to false once quiz i s fetched
    let loading = ref(false);
    let soundOn = '<i class="fas fa-volume-up" />';
    let soundOff = '<i v-else class="fas fa-volume-mute" />';
    let volume = ref(true);

    let i = 0;
    let j = 0;
    let currentRound = 1;

    //checks if players exist in localStorage and fetch
    if (localStorage.getItem("players")) {
      const Players = JSON.parse(localStorage.getItem("players")!);
      players = Players;
    }

    return {
      btnText,
      setup,
      quiz: [],
      i,
      j,
      currentRound,
      started,
      loading,
      finished: false as Boolean,
      volume,
      woops: false as Boolean,
      rounds: 5 as number,
      players,
      soundOn,
      soundOff,
    };
  },

  methods: {
    //get 5 questions per player and render the game (truefalse-component).
    loadGame(p: Array<object>, r: number, d: String) {
      if (p.length) {
        this.loading = true;

        //ensure latest versions of amount of players, rounds and difficulty-settings
        this.players = p;
        this.rounds = r;
        d = "&difficulty=" + d;

        fetch(
          "https://opentdb.com/api.php?amount=" +
            p.length * r +
            d +
            "&type=boolean"
        )
          .then((response) => response.json())
          .then((json) => {
            this.quiz = json.results;
            this.started = true;
            this.loading = false;
          });
      } else {
        //displays toast
        this.woops = true;
        setTimeout(() => (this.woops = false), 2000);
      }
    },

    next() {
      //until all questions' been asked
      if (this.i + 1 < this.quiz.length) {
        //next question
        this.i++;

        //next player
        this.j++;
      }

      if (this.j >= this.players.length) {
        this.j = 0;
        this.currentRound++;
      }
    },

    //increment currentPlayers points if result: true.
    newPoint(point: Boolean) {
      if (point) {
        this.players[this.j].points++;
      }

      //update result to localStorage once quiz is over and endGame()
      if (this.i + 1 == this.quiz.length) {
        localStorage.setItem("players", JSON.stringify(this.players));

        setTimeout(this.endGame, 1500, true);
      }
    },
    //end game, reset variables and display finished-popup
    endGame(finished: Boolean) {
      if (finished) {
        this.setup = false;
        this.finished = true;
        this.btnText = "PLAY AGAIN";
      }

       else if (this.started){
        this.setup = true;
        this.btnText = "PLAY";
      } else {
        
        this.btnText = "PLAY";
        this.setup = !this.setup
      }

      this.i = 0;
      this.j = 0;
      this.currentRound = 1;

      this.started = false;
    },

    closeFinishedPop() {
      this.finished = false;
    },

    toggleSound() {
      this.volume = !this.volume;

      return this.volume;
    },
  },
});
</script>

<style scoped>

.title {
  font-size: 3rem;
  font-weight: 800;
  width: auto;
  letter-spacing: 0.4rem;
  margin-bottom: 1rem;
  background-size:contain;
  background-image: linear-gradient(90deg, rgb(43, 248, 43), #f72343);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quiz-leave-to,
.quiz-enter-from {
  transform: translateX(-80px);
  opacity: 0;
}
.quiz-enter-active {
  transition: all 0.4s ease;
}

.setup-leave-to,
.setup-enter-from {
  transform: translateY(-80px);
  opacity: 0;
}
.setup-enter-active {
  transition: all 0.4s;
}

.toast-leave-to,
.toast-enter-from {
  transform: translateY(-80px);
  opacity: 0;
}

.toast-leave-from,
.toast-enter-to {
  opacity: 1;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}
</style>
