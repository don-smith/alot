<template>
  <div class="hello">
    <h2>Add a new thing</h2>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="vm.newThingName" />
      <button>Add</button>
    </form>
    <h2>Things</h2>
    <div v-for="thing in vm.things" :key="thing.name">
      <p>
        <router-link
          :to="{ name: 'Thing', params: { hash: thing.entry_hash } }"
        >
          {{ thing.thing_name }}
        </router-link>
      </p>
    </div>
    <img v-if="vm.busy" src="../assets/busy.gif" width="250" />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { addNewThing, getAllThings, ThingElement } from "@/service";

export default defineComponent({
  name: "Things",
  setup() {
    let vm: {
      newThingName: string;
      busy: boolean;
      things: ThingElement[];
    } = reactive({
      newThingName: "",
      busy: false,
      things: [],
    });

    async function handleSubmit(e: Event) {
      vm.busy = true;
      e.preventDefault();
      await addNewThing(vm.newThingName);
      vm.newThingName = "";
      vm.busy = false;
      await getThings();
    }

    async function getThings(): Promise<void> {
      vm.busy = true;
      const things: ThingElement[] = await getAllThings();
      for (let thing of things) {
        if (!vm.things.some((t) => t.thing_name === thing.thing_name)) {
          vm.things.push({ ...thing });
        }
      }
      vm.busy = false;
    }

    getThings();

    return {
      vm,
      handleSubmit,
    };
  },
});
</script>
