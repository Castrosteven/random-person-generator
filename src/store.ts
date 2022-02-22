import type { ResultsEntity } from "../types/index";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { InjectionKey } from "vue";

export const key: InjectionKey<Store<State>> = Symbol();

export interface State {
  favoriteUsers: ResultsEntity[];
}
export const store = createStore<State>({
  state: {
    favoriteUsers: [],
  },
  mutations: {
    addUserToFavorites(state: State, user: ResultsEntity) {
      const found = state.favoriteUsers.find(
        (person) => person.login.uuid === user.login.uuid
      );
      if (found) {
        // Remove it
        const NewArr = state.favoriteUsers.filter(
          (person) => person.login.uuid !== user.login.uuid
        );
        state.favoriteUsers = NewArr;
        return;
      }
      //else Add it
      state.favoriteUsers.push(user);
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
