// import devtools from "@vue/devtools";
import { Buffer } from "buffer";
import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import { store, key } from "@/store";

// This is a work-around until @holochain/conductor-api
// sorts out its dependency on the Node.js buffer module
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainWindow = window as any;
MainWindow.Buffer = Buffer;

createApp(App).use(router).use(store, key).mount("#app");
