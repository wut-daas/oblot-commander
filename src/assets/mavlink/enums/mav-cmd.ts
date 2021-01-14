export enum MavCmd {
	MAV_CMD_REQUEST_PROTOCOL_VERSION = 519, // Request MAVLink protocol version compatibility
	MAV_CMD_DO_DYNO_TARE = 44101, // Set zero force offset either to current reading or a specified value
	MAV_CMD_DO_SET_MOTOR = 44105, // Set motor control signal
	MAV_CMD_ENUM_END = 44106, // 
}