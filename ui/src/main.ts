import { Buffer } from "buffer";
import { createApp } from "vue";
import App from "./App.vue";

// This is a work-around until @holochain/conductor-api
// sorts out its dependency on the Node.js buffer module
const MainWindow = window as any;
MainWindow.Buffer = Buffer;

createApp(App).mount("#app");
