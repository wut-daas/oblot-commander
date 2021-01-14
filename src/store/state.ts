import SerialPort from 'serialport'

export type State = {
  serialPort: SerialPort | null
}
export const state: State = {
  // Note: the serialport library internally uses some proxy,
  // so this property must be accessed directly, not through store
  serialPort: null,
}
