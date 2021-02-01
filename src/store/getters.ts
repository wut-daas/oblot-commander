import { unref } from 'vue'
import { GetterTree } from 'vuex'
import { ConnectionStatus } from './mavconnection'
import { State } from './state'

export type Getters = {
  isConnected(state: State): boolean
  connectionStatus(state: State): ConnectionStatus
}

export const getters: GetterTree<State, State> & Getters = {
  isConnected(state) {
    return (
      state.connection !== null &&
      unref(state.connection.status) === ConnectionStatus.Connected
    )
  },
  connectionStatus(state) {
    if (state.connection === null) return ConnectionStatus.NotConnected
    else {
      return unref(state.connection.status)
    }
  },
}
