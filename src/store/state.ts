import { MavConnection } from './mavconnection'
import { MessageBus } from './message-bus'
import { ParamBuffer } from './services/parameters'

export type State = {
  connection: MavConnection | null
  messageBus: MessageBus
  parameters: ParamBuffer
}
export const state: State = {
  connection: null,
  messageBus: new MessageBus(),
  parameters: new ParamBuffer(),
}
