import { MavConnection } from './mavconnection'
import { MessageBus } from './message-bus'
import { ParamBuffer } from './services/parameters'
import { PlotBackend } from './services/plot-backend'

export type State = {
  connection: MavConnection | null
  messageBus: MessageBus
  parameters: ParamBuffer
  plotBackend: PlotBackend
}
export const state: State = {
  connection: null,
  messageBus: new MessageBus(),
  parameters: new ParamBuffer(),
  plotBackend: new PlotBackend(),
}
