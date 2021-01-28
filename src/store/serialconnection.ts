import { ConnectionStatus, MavConnection } from './mavconnection'
import SerialPort from 'serialport'

export class SerialConnection extends MavConnection {
  serialPort: SerialPort
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
  }

  write(data: Buffer): void {
    this.serialPort.write(data)
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
