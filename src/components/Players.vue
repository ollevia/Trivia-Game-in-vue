<template>

    <div class="w-100 pb-4 d-flex flex-column">
      <div class="setup mb-3" v-if="setup">
        <b-container class="d-flex justify-content-between p-0">
          <b-button @click="resetAll" class="redBtn w-50 me-3">clear players</b-button>
          <b-button @click="resetPoints(players)" class="redBtn w-50">reset points</b-button>
        </b-container>
        <div class="quizSettings my-4 d-flex justify-content-evenly">
          <div class="d-flex justify-content-between align-items-baseline">
            <label for="rounds" class="me-2 text-start">Rounds:</label>
            <select v-model="rounds">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="d-flex justify-content-between align-items-baseline">
            <label for="difficulty" class="me-2 text-start">Difficulty: </label>
            <select v-model="difficulty">
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div style="height: 3rem"  class="d-flex">
          
          <input

            style="border-color: black; border-radius: 0.3rem;"
            class="w-75 h-100 me-3"
            type="text"
            v-model="newPlayer"
            ref="newPlayer"
            placeholder=" Add player"
            @keypress.enter="addPlayer"
            required
          />
          <b-button class="h-100 w-25" style="
    background-color: #44973f; border-radius: 0.3rem; border-color: black;" @click="addPlayer">add</b-button>
           
        </div>
      </div>

        <hr class="my-0 w-100">
      <table
        class="
          table table-borderless
          my-5
          text-start
          m-auto
        "
        style="min-height: 80px"
      >
        <thead class="border-bottom">
          <th>Name:</th>
          <th>Points:</th>
        </thead>
        
        <tbody>
          <template v-for="(player, index) in sortPlayers" :key="index">
            <tr>
              <td class="pt-3">{{ player.name }}</td>
               <td class="pt-3">{{ player.points }}</td>
              <td>
                <b-button
                v-if="setup"
                  @click="deletePlayer(index)"
                  class="redBtn deleteBtn float-end text-light"
                  >&#10799;</b-button
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    <b-button
      class="startButton m-auto"
      @click="loadGame(players, Number(rounds), difficulty)"
      variant="success"
    >{{btnText}}
    </b-button>
    <div v-if="finished">
      <Popup
        v-for="player in sortPlayers.slice(0, 1)"
        :key="player"
        :close="closePop"
        :volume="volume"
        :title="('The winner is <u>' + player.name + '</u>').toUpperCase()"
        :content="'With <b> ' + player.points + ' </b> correct answers!'"
        :theme="'winner'"
      />
    </div>
    </div>

    
</template>



<script lang="ts">
import { ref, defineComponent } from "vue";
import Popup from "./Popup.vue";

export default defineComponent({
  props: {
    loadGame: Function,
    finished: Boolean,
    closePop: Function,
    volume: Boolean,
    setup: Boolean,
    btnText: String
  },

  components: {
    Popup,
  },

  data() {

    const players = ref([]) as any;
    const rounds = ref(5);
    const difficulty = ref("");
    const newPlayer = ref("");

    if (localStorage.getItem("players")) {
      players.value = JSON.parse(localStorage.getItem("players")!);
    }
    
    return {
      players,
      rounds,
      newPlayer,
      difficulty,
    };
    
  },

  methods: {
    addPlayer() {
      if (this.newPlayer) {
        this.players.push({
          name: this.newPlayer,
          points: 0,
        });
      }

      this.savePlayerList();
      (this.$refs["newPlayer"] as any).focus();
      this.newPlayer = "";
    },

    deletePlayer(index: Number) {
      this.players.splice(index, 1);
      this.savePlayerList();
    },

    savePlayerList() {
      localStorage.setItem("players", JSON.stringify(this.players));
    },

    resetAll () {
      if (localStorage.getItem("players")){
          localStorage.removeItem("players")!
           this.players = ref([]) as any;
      }
    },

    resetPoints(players = [] as any) {
      if (localStorage.getItem("players")){
        
       for(let i = 0; i < players.length; i++){
         players[i].points = 0
       }

       localStorage.setItem("players", JSON.stringify(this.players))
      
      }
    }
  
},

  computed: {
    sortPlayers: function () {
      let sortedPlayers = this.players;
      return (sortedPlayers = sortedPlayers.sort((a: any, b: any) => {
        let fa = a.points,
          fb = b.points;
        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      }));
    },
  },
});
</script>
<style scoped>

.startButton {
  font-size: 2.3rem;
  font-weight: 500;
  background-color: #44973f;
  width: 12rem;
  height: 12rem;
  border-radius: 12rem;
  box-shadow: inset 1px 6px 12px lightgreen, inset -1px -10px 5px darkgreen,
    1px 2px 1px black;
}

.startButton:hover {
  background-color: rgb(83, 190, 83);
}



.redBtn {
  background-color: #b94355;
    border: black;
    border-radius: 0.3rem;
    min-width: 3rem;
    align-content: center;
    height: 3rem;
}

.redBtn:hover {
  background-color: #ed677a;
}

.deleteBtn {
  font-weight: 400;
  font-size: 1.6rem;
  padding-top: 2px;
}

.toast {
  padding: 20px;
  color: white;
  background: #ff0062;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
}
.quizSettings {
  widows: 100%;
  background-color: #237AA9;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  border-radius: 0.3rem ;
}

select {
  color: white;
  border: none;
  background-color: transparent;
  font-weight: 600;
}

option {
  background-color: #237AA9;
}


</style>
