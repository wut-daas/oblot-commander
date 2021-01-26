import { MutationTree } from 'vuex'
import { State } from './state'
import { MavConnection } from './mavconnection'

export enum MutationType {
  SetConnection = 'SET_CONNECTION',
}

export type Mutations = {
  [MutationType.SetConnection](state: State, conn: MavConnection | null): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetConnection](state, conn) {
    state.connection = conn
  },
}
