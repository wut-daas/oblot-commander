import { MavConnection } from './mavconnection'

export type State = {
  connection: MavConnection | null
}
export const state: State = {
  // Note: the serialport library internally uses some proxy,
  // so this property must be accessed directly, not through store
  connection: null,
}
