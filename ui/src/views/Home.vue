<template>
  <div class="home">
    <Things />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Things from "@/components/Things.vue";

export default {
  name: "Home",
  components: {
    Things,
  },
};
</script>
