<template>
  <div class="thing">
    <h1>{{ name }}</h1>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { ThingElement } from "@/service";

export default defineComponent({
  name: "Thing",
  setup() {
    const route = useRoute();
    const store = useStore();
    const { hash } = route.params;

    async function getThing(hash): Promise<ThingElement> {
      store.commit("busy", true);
      store.dispatch("getThing", hash).then(() => {
        store.commit("busy", false);
      });
    }

    getThing(hash);

    return {
      name: computed(() => store.state.activeThing?.thing_name),
    };
  },
});
</script>
