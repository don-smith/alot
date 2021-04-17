<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div>
    <button @click="handleClick">Say hello</button>
    <p>{{ greeting }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppWebsocket } from "@holochain/conductor-api";

export default defineComponent({
  name: "Greeter",
  props: {
    msg: String,
  },
  data() {
    return {
      greeting: "",
    };
  },
  methods: {
    handleClick() {
      const getGreeting = async () => {
        const appConnection = await AppWebsocket.connect("ws://localhost:8888");
        const appInfo = await appConnection.appInfo({
          installed_app_id: "greeter-app",
        });
        const cellId = appInfo.cell_data[0].cell_id;

        const message = await appConnection.callZome({
          cap: null,
          cell_id: cellId,
          zome_name: "greeter",
          fn_name: "hello",
          provenance: cellId[1],
          payload: null,
        });

        this.greeting = `👋 ${message} 👋`;
      };

      getGreeting();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
