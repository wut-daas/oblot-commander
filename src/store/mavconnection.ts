import { MAVLinkMessage, MAVLinkModule } from '@ifrunistuttgart/node-mavlink'
import { messageRegistry } from '@/assets/mavlink/message-registry'

export abstract class MavConnection {
  mav: MAVLinkModule
  constructor() {
    this.mav = new MAVLinkModule(messageRegistry, 0, false)
    // FIXME: Autonegotiation is disabled because it sends protocol command immediately, before backend is ready
    this.mav.upgradeLink()
  }

  abstract write(data: Buffer): void
  abstract close(): Promise<boolean>

  send(message: MAVLinkMessage): void {
    this.write(this.mav.pack([message]))
  }
}
