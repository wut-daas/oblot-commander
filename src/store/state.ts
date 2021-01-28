import { MavConnection } from './mavconnection'

export type State = {
  connection: MavConnection | null
}
export const state: State = {
  connection: null,
}
