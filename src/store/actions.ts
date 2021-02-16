import { ActionTree, ActionContext } from 'vuex'
import { state, State } from './state'
import { Mutations, MutationType } from './mutations'
import { MavConnection } from './mavconnection'
import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink'
import { ParamRequestList } from '@/assets/mavlink/messages/param-request-list'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit' | 'state'>

export enum ActionType {
  CheckAvailable = 'checkAvailable',
  Connect = 'connect',
  Disconnect = 'disconnect',
  RegisterParams = 'registerParams',
  RefreshParams = 'refreshParams',
  WriteParams = 'writeParams',
}

export interface Actions {
  [ActionType.CheckAvailable](): Promise<string[]>
  [ActionType.Connect](
    { commit, rootState }: AugmentedActionContext,
    connection: MavConnection
  ): void
  [ActionType.Disconnect]({ commit }: AugmentedActionContext): Promise<boolean>
  [ActionType.RegisterParams]({ rootState }: AugmentedActionContext): void
  [ActionType.RefreshParams]({ rootState }: AugmentedActionContext): void
  [ActionType.WriteParams]({ rootState }: AugmentedActionContext): void
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
  [ActionType.Connect]({ commit, rootState }, connection) {
    commit(MutationType.SetConnection, connection)

    connection.mav.on('error', function(err: Error) {
      rootState.messageBus.handleMavError(err)
    })
    connection.mav.on('message', function(message: MAVLinkMessage) {
      rootState.messageBus.handleMessage(message)
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
  [ActionType.RegisterParams]({ rootState }) {
    if (!rootState.parameters.registered) {
      rootState.messageBus.on('PARAM_VALUE', msg =>
        rootState.parameters.handleParamValue(msg)
      )
      rootState.parameters.registered = true
    }
  },
  [ActionType.RefreshParams]({ rootState }) {
    // TODO: request not received parameters
    const msg = new ParamRequestList(0, 0) // broadcast
    rootState.connection?.send(msg)
  },
  [ActionType.WriteParams]({ rootState }) {
    const msgs = rootState.parameters.getUpdateMessages()
    for (let i = 0; i < msgs.length; i++) {
      rootState.messageBus.sendReliable(
        () => rootState.connection?.send(msgs[i]),
        {
          messageName: 'PARAM_VALUE',
          fieldValues: [['param_id', msgs[i].param_id]],
        }
      )

      console.debug(
        `setting ${msgs[i].param_id} to ${msgs[i].param_value} of type ${msgs[i].param_type}`
      )
    }
  },
}
