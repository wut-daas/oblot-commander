import SerialPort from 'serialport'
import { MAVLinkModule } from '@ifrunistuttgart/node-mavlink'

export type State = {
  serialPort: SerialPort | null
  mavLink: MAVLinkModule | null
}
export const state: State = {
  // Note: the serialport library internally uses some proxy,
  // so this property must be accessed directly, not through store
  serialPort: null,
  mavLink: null,
}
