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
      state.connection.status.value === ConnectionStatus.Connected
    )
  },
  connectionStatus(state) {
    if (state.connection === null) return ConnectionStatus.Disconnected
    else {
      // Typescript doesn't know that Vue will unpack this value, this way the reactivity "just works"
      return (state.connection.status as unknown) as ConnectionStatus
    }
  },
}
