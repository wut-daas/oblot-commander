import { MAVLinkMessage, MAVLinkModule } from '@ifrunistuttgart/node-mavlink'
import { messageRegistry } from '@/assets/mavlink/message-registry'
import { Heartbeat } from '@/assets/mavlink/messages/heartbeat'
import { ref, Ref } from 'vue'

export const enum ConnectionStatus {
  Disconnected,
  WaitingForHeartbeat,
  Connected,
  TimedOut,
  Closing,
}

export abstract class MavConnection {
  mav: MAVLinkModule
  heartbeatTimer: NodeJS.Timeout | null
  lastHeartbeat: Heartbeat | null
  // Ref is required here to make the property reactive because the store is initialized with null connection
  status: Ref<ConnectionStatus>
  constructor() {
    this.status = ref(ConnectionStatus.Disconnected)
    this.heartbeatTimer = null
    this.lastHeartbeat = null
    this.mav = new MAVLinkModule(messageRegistry, 0, false)
    // FIXME: Autonegotiation is disabled because it sends protocol command immediately, before backend is ready
    this.mav.upgradeLink()
  }

  abstract write(data: Buffer): void
  abstract close(): Promise<boolean>

  waitHeartbeat(): void {
    this.status.value = ConnectionStatus.WaitingForHeartbeat
    this.mav.on('HEARTBEAT', (msg: MAVLinkMessage) => this.onHeartbeat(msg))
  }

  onHeartbeat(msg: MAVLinkMessage): void {
    if (this.heartbeatTimer !== null) {
      clearTimeout(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    this.status.value = ConnectionStatus.Connected
    this.heartbeatTimer = setTimeout(
      () => (this.status.value = ConnectionStatus.TimedOut),
      5000
    )
    this.lastHeartbeat = msg as Heartbeat
  }

  send(message: MAVLinkMessage): void {
    this.write(this.mav.pack([message]))
  }
}
