<template>
  <div class="hello">
    <h1>Add a new thing</h1>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="vm.thingName" />
      <button>Add</button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { connect, addNewThing } from "../service";

export default defineComponent({
  name: "Thing",
  setup() {
    let vm = reactive({
      thingName: "",
    });

    async function handleSubmit(e: Event) {
      e.preventDefault();
      const conn = await connect();
      const newThing = await addNewThing(vm.thingName, conn);
      console.log("newThing:", newThing);
      vm.thingName = "";
    }

    return {
      vm,
      handleSubmit,
    };
  },
});
</script>
