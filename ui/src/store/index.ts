import { createStore } from "vuex";

import { ThingElement } from "@/service";

/* eslint-disable @typescript-eslint/no-explicit-any */
const store: {
  state: { things: ThingElement[]; busy: boolean };
  mutations: any;
  actions: any;
  modules: any;
} = {
  state: { things: [], busy: false },
  mutations: {},
  actions: {},
  modules: {},
};

export default createStore(store);
