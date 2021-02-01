import { ConnectionStatus, MavConnection } from './mavconnection'
import SerialPort from 'serialport'

export class SerialConnection extends MavConnection {
  serialPort: SerialPort
  private unproxiedWrite: (data: Buffer) => void // Store direct reference
  constructor(path: string, baudRate: number) {
    super()
    this.serialPort = new SerialPort(path, { baudRate: baudRate })
    this.serialPort.on('open', () => this.waitHeartbeat())
    this.serialPort.on(
      'close',
      () => (this.status.value = ConnectionStatus.Disconnected)
    )

    this.serialPort.on('data', (data: Buffer) => {
      this.mav.parse(data)
    })

    this.unproxiedWrite = (data: Buffer) => {
      this.serialPort.write(data)
    }
  }

  write(data: Buffer): void {
    // When called from Vue 'this' is encapsulated in a Proxy
    // which returns an object for binding instead of native code
    this.unproxiedWrite(data)
  }

  close(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.status.value === ConnectionStatus.Disconnected) {
        resolve(true)
      } else {
        this.status.value = ConnectionStatus.Closing
        this.serialPort.close(err => {
          if (err) {
            if (err.message === 'Port is not open') {
              // Ideally, this wouldn't happen, but closing succeeded
              console.warn('Attempted to close already closed port')
              resolve(true)
            } else {
              console.error('Error closing port', err)
              resolve(false)
            }
          } else {
            resolve(true)
          }
        })
      }
    })
  }
}
