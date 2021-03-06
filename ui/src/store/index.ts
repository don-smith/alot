import { InjectionKey } from "vue";
import {
  Store,
  createStore,
  StoreOptions,
  ActionContext,
  useStore as baseUseStore,
} from "vuex";

import { addNewThing, getAllThings, getThing, ThingElement } from "@/service";

export interface State {
  busy: boolean;
  things: ThingElement[];
  activeThing?: ThingElement;
}

export const key: InjectionKey<Store<State>> = Symbol();

// Will move mutations and actions to separate files when their size justifies
/* eslint-disable @typescript-eslint/no-explicit-any */
const options: StoreOptions<State> = {
  state: {
    busy: false,
    things: [],
    activeThing: undefined,
  },

  mutations: {
    busy(state: State, busy: boolean) {
      state.busy = busy;
    },
    saveThings(state: State, things: ThingElement[]) {
      state.things = things;
    },
    makeActive(state: State, thing: ThingElement) {
      state.activeThing = thing;
    },
  },

  actions: {
    async addThing(context: ActionContext<State, State>, newThingName: string) {
      await addNewThing(newThingName);
      context.dispatch("getThings");
    },
    async getThings(context: ActionContext<State, State>) {
      const things: ThingElement[] = await getAllThings();
      context.commit("saveThings", things);
    },
    async getThing(context: ActionContext<State, State>, hash: string) {
      const thing: ThingElement = await getThing(hash);
      context.commit("makeActive", thing);
    },
  },
};

export const store = createStore<State>(options);

export function useStore(): Store<State> {
  return baseUseStore(key);
}
