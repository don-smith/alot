// import devtools from "@vue/devtools";
import { Buffer } from "buffer";
import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";

// This is a work-around until @holochain/conductor-api
// sorts out its dependency on the Node.js buffer module
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainWindow = window as any;
MainWindow.Buffer = Buffer;

createApp(App).use(router).mount("#app");

// if (process.env.NODE_ENV === "development") {
//   devtools.connect([> host, port <]);
// }
