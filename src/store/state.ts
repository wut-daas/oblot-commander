import SerialPort from 'serialport'

export type State = {
  serialPort: SerialPort | null
}
export const state: State = {
  serialPort: null,
}
