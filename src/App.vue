<template>

<Game />

<particles-bg type="lines" color="black" :bg="true" />
  
  <div class="credits">
    
  <hr>
  <p>Content from <a href="https://opentdb.com/">Open Trivia DB</a></p>
    <p>
    Music from <a
      href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=6008">Pixabay</a></p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Game from "./pages/Game.vue";
import { ParticlesBg } from "particles-bg-vue";

if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js', {scope: '/js/'}).then(function() {
    console.log('serviceworker registrerad')
  })
}

@Options({
  components: {
    Game,
    ParticlesBg
  },

})
export default class App extends Vue {}
</script>

<style>
#bg {
  position: fixed !important;
}
a.nav-link,
h1,
h2,
button.btn {
  color: #ddd9d9;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0;
  
}

h1, .startButton {
  
  font-family: 'Monoton', cursive;
}

table.table {
  color: #ddd9d9;
}

a.nav-link {
  cursor: pointer;
}
a.nav-link:hover {
  color: rgb(83, 190, 83);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd9d9;
  min-width: 340px;
  position: relative;
  min-height: 100vh;
  padding-bottom: 70px; 
}

.credits {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
