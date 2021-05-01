<template>
  <div class="hello">
    <h2>Add a new thing</h2>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="newThingName" />
      <button>Add</button>
    </form>
    <div v-if="things.length">
      <h2>Things</h2>
      <div v-for="thing in things" :key="thing.name">
        <p>
          <router-link
            :to="{ name: 'Thing', params: { hash: thing.entry_hash } }"
          >
            {{ thing.thing_name }}
          </router-link>
        </p>
      </div>
      <img v-if="busy" src="../assets/busy.gif" width="250" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Things",
  setup() {
    const store = useStore();
    let newThingName = ref("");
    let busy = computed(() => store.state.busy);
    let things = computed(() => store.state.things);

    store.commit("busy", true);

    async function handleSubmit(e: Event) {
      store.commit("busy", true);
      e.preventDefault();
      store.dispatch("addThing", newThingName.value);
      newThingName.value = "";
      store.commit("busy", false);
      await getThings();
    }

    async function getThings(): Promise<void> {
      store.commit("busy", true);
      store.dispatch("getThings");
      store.commit("busy", false);
    }

    getThings();

    return {
      busy,
      things,
      newThingName,
      handleSubmit,
    };
  },
});
</script>
