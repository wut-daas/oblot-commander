import { Heartbeat } from '@/assets/mavlink/messages/heartbeat'
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

export interface ResponseIdentifier {
  messageName: keyof StrictMessages
  fieldValues: Array<[string, number | string]>
}

interface ExpectedResponse extends ResponseIdentifier {
  id: number
  timesRetried: number
  senderFunction: () => void
}

export enum MessageStatus {
  Unknown = 0,
  Succeeded,
  Retrying,
  Failed,
}

export class MessageBus extends EventEmitter {
  private expectedResponses = Array<ExpectedResponse>()
  private nextResolveId = 0
  private timerId: NodeJS.Timeout | undefined
  private retryCount = 5
  private succeededIds = Array<number>()
  private failedIds = Array<number>()

  constructor() {
    super()
  }

  handleMessage(msg: MAVLinkMessage): void {
    const name = msg._message_name as keyof BusEvents
    this.emit(name, msg as Heartbeat) // need a type from StrictMessages here to keep Typescript happy.
    // StrictMessages by design do not contain a generic message,
    // and Heartbeat must be supported in every dialect anyway

    if (name !== 'HEARTBEAT' && name !== 'OBLOT_DYNO_FORCE') {
      console.debug('handleMessage', msg)
    }

    const responded = [] as number[]
    if (this.expectedResponses.findIndex(r => r.messageName == name) >= 0) {
      for (const response of this.expectedResponses.filter(
        r => r.messageName == name
      )) {
        let matching = true
        for (const fieldValue of response.fieldValues) {
          if (msg[fieldValue[0]] != fieldValue[1]) {
            matching = false
            break
          }
        }
        if (matching) {
          responded.push(response.id)
        }
      }
    }

    this.succeededIds = this.succeededIds.concat(responded)
    this.expectedResponses = this.expectedResponses.filter(
      r => !responded.includes(r.id)
    )
  }

  handleMavError(err: Error): void {
    this.emit('mavError', err)
  }

  resendMessages(): void {
    const idsToRemove = [] as number[]
    for (const unreplied of this.expectedResponses) {
      if (unreplied.timesRetried < this.retryCount) {
        unreplied.senderFunction()
        unreplied.timesRetried += 1
      } else {
        console.warn(
          `Didn't get ${unreplied.messageName} after ${unreplied.timesRetried} attempts, removing`,
          unreplied
        )
        idsToRemove.push(unreplied.id)
      }
    }

    this.failedIds = this.failedIds.concat(idsToRemove)
    this.expectedResponses = this.expectedResponses.filter(
      r => !idsToRemove.includes(r.id)
    )
  }

  sendReliable(
    senderFunction: () => void,
    response: ResponseIdentifier
  ): number {
    const expected = new Object() as ExpectedResponse
    expected.senderFunction = senderFunction
    expected.messageName = response.messageName
    expected.fieldValues = response.fieldValues
    expected.timesRetried = 0
    expected.id = this.nextResolveId
    this.nextResolveId += 1

    this.expectedResponses.push(expected)

    if (this.timerId === undefined) {
      // FIXME: This lazy solution will sometimes unnecessarily send a message twice
      // if sendReliable is called just before resendMessages, the remote doesn't get a chance to respond in time
      this.timerId = setInterval(() => this.resendMessages(), 1000)
    }

    return expected.id
  }

  messageStatus(id: number): MessageStatus {
    if (this.succeededIds.includes(id)) return MessageStatus.Succeeded
    else if (this.failedIds.includes(id)) return MessageStatus.Failed
    else if (this.expectedResponses.findIndex(r => r.id === id) >= 0)
      return MessageStatus.Retrying
    else return MessageStatus.Unknown
  }
}
