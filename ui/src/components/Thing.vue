<template>
  <div class="hello">
    <h1>Add a new thing</h1>
    <form @submit="handleSubmit">
      <input type="text" name="name" v-model="thingName">
      <button>Say hello</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppWebsocket } from "@holochain/conductor-api";

export default defineComponent({
  name: "Thing",
  props: {
    msg: String,
  },
  data() {
    return {
      thingName: "",
    };
  },
  methods: {
    handleSubmit(e: Event) {
      e.preventDefault();
      const addNewThing = async () => {
        const appConnection = await AppWebsocket.connect("ws://localhost:8888");
        const appInfo = await appConnection.appInfo({
          installed_app_id: "alot-app",
        });
        const cellId = appInfo.cell_data[0].cell_id;

        const headerHash = await appConnection.callZome({
          cap: null,
          cell_id: cellId,
          zome_name: "greeter",
          fn_name: "add_thing",
          provenance: cellId[1],
          payload: { name: this.thingName },
        });

        console.log("headerHash:", headerHash);
      };

      addNewThing();
    },
  },
});
</script>
