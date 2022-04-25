<template>
<div class="backdrop">
  <div class="loader"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
});
</script>

<style scoped>
.backdrop {
  
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.loader {
  width: 150px;
  height: 150px;
  background-image: url(../assets/loading.png);
  background-size: contain;
  left: 50%;
  top: 50%;
  margin-left: -75px;
  position: absolute;
  animation: spin 2s steps(8, end) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>