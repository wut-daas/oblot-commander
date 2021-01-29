import { MavConnection } from './mavconnection'
import { MessageBus } from './message-bus'

export type State = {
  connection: MavConnection | null
  messageBus: MessageBus
}
export const state: State = {
  connection: null,
  messageBus: new MessageBus(),
}
