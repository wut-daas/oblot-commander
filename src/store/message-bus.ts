import { StrictMessages } from '@/assets/mavlink/strict-messages'
import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink'
import { EventEmitter } from 'events'

interface BusEvents extends StrictMessages {
  // using lowercase here ensures there will be no collision with a MAVLink message with the same name
  mavError: Error
  // there is no 'message' event on purpose in order to prevent components from listening to it
  // and duplicating the code to differentiate between message types
}

export declare interface MessageBus {
  on<U extends keyof BusEvents>(
    event: U,
    listener: (msg: BusEvents[U]) => void
  ): this

  emit<U extends keyof BusEvents>(event: U, ...args: [BusEvents[U]]): boolean
}

export class MessageBus extends EventEmitter {
  constructor() {
    super()
  }

  handleMessage(msg: MAVLinkMessage): void {
    const name = msg._message_name as keyof BusEvents
    this.emit(name, msg as BusEvents[typeof name])
  }

  handleMavError(err: Error): void {
    this.emit('mavError', err)
  }
}
