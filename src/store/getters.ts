import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isConnected(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  isConnected(state) {
    return state.connection !== null
  },
}
