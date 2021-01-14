import { ActionTree, ActionContext } from 'vuex'
import { state, State } from './state'
import { Mutations, MutationType } from './mutations'

import SerialPort from 'serialport'
import { PortInfo } from 'serialport'

import { MAVLinkModule, MAVLinkMessage } from '@ifrunistuttgart/node-mavlink'
import { messageRegistry } from '@/assets/mavlink/message-registry'

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
  SetupMavlink = 'setupMavlink',
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
  [ActionType.SetupMavlink](): boolean
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
  [ActionType.SetupMavlink]() {
    if (!state.serialPort) return false

    const mav = new MAVLinkModule(messageRegistry)
    state.mavLink = mav

    state.serialPort.on('data', function(data: Buffer) {
      mav.parse(data) //TODO: Enable timer_1 in mavlink-module.js when PCBs are fixed
    })
    mav.on('error', function(err: Error) {
      console.warn('Error parsing MAVLink', err.name)
    })
    mav.on('message', function(message: MAVLinkMessage) {
      console.log(message)
    })

    return true
  },
}
