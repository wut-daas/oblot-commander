import { MutationTree } from 'vuex'
import { State } from './state'
import SerialPort from 'serialport'

export enum MutationType {
  SetSerialPort = 'SET_SERIAL_PORT',
}

export type Mutations = {
  [MutationType.SetSerialPort](state: State, port: SerialPort | null): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetSerialPort](state, port) {
    state.serialPort = port
  },
}
