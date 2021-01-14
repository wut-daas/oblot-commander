export enum ArcherState {
	ARCHER_STATE_MAINBOARD_OK = 1, // Mainboard main program working.
	ARCHER_STATE_POWERBOARD_OK = 2, // Powerboard main program working.
	ARCHER_STATE_MEASURING_BATTERY = 4, // Battery measured recently.
	ARCHER_STATE_MEASURING_RPM = 8, // RPM measured recently.
	ARCHER_STATE_MEASURING_TEMPERATURE = 16, // Temperature measured recently.
	ARCHER_STATE_MEASURING_ANGLE = 32, // Angle measured recently.
	ARCHER_STATE_MEASURING_AERODYNAMIC = 64, // Aerodynamic conditions measured recently.
	ARCHER_STATE_SYNC_PWM = 1024, // Synchronising PWM from autopilot available.
	ARCHER_STATE_ENUM_END = 1025, // 
}