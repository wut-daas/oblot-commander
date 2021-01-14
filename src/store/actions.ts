import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'

import SerialPort from 'serialport'
import { MutationType } from './mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionType {
  ConnectSerial = 'connectSerial',
}

export interface Actions {
  [ActionType.ConnectSerial](
    { commit }: AugmentedActionContext,
    payload: { path: string; baud: number }
  ): Promise<boolean>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionType.ConnectSerial]({ commit }, payload) {
    return new Promise(resolve => {
      const serialPort = new SerialPort(
        payload.path,
        {
          baudRate: payload.baud,
        },
        err => {
          if (err) resolve(false)
        }
      )
      serialPort.on('open', () => {
        commit(MutationType.SetSerialPort, serialPort)
        resolve(true)
      })
    })
  },
}
