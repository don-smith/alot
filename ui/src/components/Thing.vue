<template>
  <div class="hello">
    <h1>Add a new thing</h1>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="thingName" />
      <button>Add</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { connect, addNewThing } from "../service";

export default defineComponent({
  name: "Thing",
  setup() {
    let thingName = "";

    async function handleSubmit(e: Event) {
      e.preventDefault();
      const conn = await connect();
      addNewThing(thingName, conn);
    }

    return {
      thingName,
      handleSubmit,
    };
  },
});
</script>
