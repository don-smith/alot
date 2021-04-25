<template>
  <div class="hello">
    <h1>Add a new thing</h1>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="vm.newThingName" />
      <button>Add</button>
    </form>
    <div v-for="thing in vm.things" :key="thing.name">
      <p>{{ thing.name }}</p>
    </div>
    <img v-if="vm.busy" src="/images/busy.gif" width="250" />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { connect, addNewThing, getAllThings, Thing } from "../service";

export default defineComponent({
  name: "Thing",
  setup() {
    let vm: {
      newThingName: string;
      busy: boolean;
      things: Thing[];
    } = reactive({
      newThingName: "",
      busy: false,
      things: [],
    });

    async function handleSubmit(e: Event) {
      vm.busy = true;
      e.preventDefault();
      const conn = await connect();
      await addNewThing(vm.newThingName, conn);
      vm.newThingName = "";
      vm.busy = false;
      await getThings();
    }

    async function getThings(): Promise<void> {
      vm.busy = true;
      const conn = await connect();
      const things: Thing[] = await getAllThings(conn);
      for (let thing of things) {
        if (!vm.things.some((t) => t.name === thing.name)) {
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
