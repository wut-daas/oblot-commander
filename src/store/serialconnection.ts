import { MavConnection } from './mavconnection'
import SerialPort from 'serialport'

export class SerialConnection extends MavConnection {
  serialPort: SerialPort
  constructor(path: string, baudRate: number) {
    super()
    this.serialPort = new SerialPort(path, { baudRate: baudRate })
    this.serialPort.on('data', (data: Buffer) => {
      this.mav.parse(data)
    })
  }

  write(data: Buffer): void {
    throw new Error('Method not implemented.')
  }

  close(): Promise<boolean> {
    return new Promise(resolve => {
      this.serialPort.close(err => {
        if (err) {
          console.error('Error closing port', err)
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}
