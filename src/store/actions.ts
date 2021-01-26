import { ActionTree, ActionContext } from 'vuex'
import { state, State } from './state'
import { Mutations, MutationType } from './mutations'
import { MavConnection } from './mavconnection'
import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionType {
  CheckAvailable = 'checkAvailable',
  Connect = 'connect',
  Disconnect = 'disconnect',
}

export interface Actions {
  [ActionType.CheckAvailable](): Promise<string[]>
  [ActionType.Connect](
    { commit }: AugmentedActionContext,
    connection: MavConnection
  ): void
  [ActionType.Disconnect]({ commit }: AugmentedActionContext): Promise<boolean>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionType.CheckAvailable]() {
    return new Promise(resolve => {
      const connections: string[] = []

      if (process?.versions?.electron) {
        connections.push('serial')
      }

      resolve(connections)
    })
  },
  [ActionType.Connect]({ commit }, connection) {
    commit(MutationType.SetConnection, connection)

    connection.mav.on('error', function(err: Error) {
      console.warn('Error parsing MAVLink', err.name)
    })
    connection.mav.on('message', function(message: MAVLinkMessage) {
      console.log(message)
    })
  },
  [ActionType.Disconnect]({ commit }) {
    return new Promise(resolve => {
      if (state.connection === null) {
        resolve(true)
      } else {
        state.connection.close().then(success => {
          if (success) {
            resolve(true)
            commit(MutationType.SetConnection, null)
          } else {
            resolve(false)
          }
        })
      }
    })
  },
}
