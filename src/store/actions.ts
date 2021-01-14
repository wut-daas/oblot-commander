import { ActionTree, ActionContext } from 'vuex'
import { state, State } from './state'
import { Mutations } from './mutations'

import SerialPort from 'serialport'
import { PortInfo } from 'serialport'
import { MutationType } from './mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionType {
  ConnectSerial = 'connectSerial',
  DisconnectSerial = 'disconnectSerial',
  ListPorts = 'listPorts',
}

export interface Actions {
  [ActionType.ConnectSerial](
    { commit }: AugmentedActionContext,
    payload: { path: string; baud: number }
  ): Promise<boolean>
  [ActionType.DisconnectSerial]({
    commit,
  }: AugmentedActionContext): Promise<boolean>
  [ActionType.ListPorts](): Promise<PortInfo[] | null>
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
          if (err) {
            console.error('Error creating port', err)
            resolve(false)
          }
        }
      )
      serialPort.on('open', () => {
        commit(MutationType.SetSerialPort, serialPort)
        resolve(true)
      })
    })
  },
  [ActionType.DisconnectSerial]({ commit }) {
    return new Promise(resolve => {
      if (state.serialPort === null) {
        resolve(true)
      } else {
        state.serialPort.close(err => {
          if (err) {
            console.error('Error closing port', err)
            resolve(false)
          } else {
            commit(MutationType.SetSerialPort, null)
            resolve(true)
          }
        })
      }
    })
  },
  [ActionType.ListPorts]() {
    return new Promise(resolve => {
      SerialPort.list()
        .catch(err => {
          console.error('Error listing ports', err)
          resolve(null)
        })
        .then(ports => {
          if (ports) resolve(ports)
          else resolve(null)
        })
    })
  },
}
