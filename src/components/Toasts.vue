<template>
<div class="backdrop">
    <div class="toasts">
        <i class="fas fa-exclamation-triangle"></i>
        <p v-html="content"/>   
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        content: String,
    },
})
</script>

<style scoped>

.toasts {
  position: absolute;
  background-color: #c72f46;
  padding: .5rem;
  width: 300px;
  border-radius: 1rem;
  left: 50%;
  margin-top: -70px;
  margin-left: -150px;
}

</style>