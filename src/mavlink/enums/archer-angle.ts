export enum ArcherAngle {
	ARCHER_ANGLE_UNKNOWN = 0, // Unknown angle is measured
	ARCHER_ANGLE_SWASHPLATE1 = 1, // Angle of swashplate actuator 1, positive increasing thrust.
	ARCHER_ANGLE_SWASHPLATE2 = 2, // Angle of swashplate actuator 2, positive increasing thrust.
	ARCHER_ANGLE_SWASHPLATE3 = 3, // Angle of swashplate actuator 3, positive increasing thrust.
	ARCHER_ANGLE_TAIL1 = 4, // Angle of tail actuator 1, positive increasing thrust.
	ARCHER_ANGLE_TAIL2 = 5, // Angle of tail actuator 2, positive increasing thrust.
	ARCHER_ANGLE_WING = 6, // Incidence angle of wing, positive increasing lift.
	ARCHER_ANGLE_ELEVATOR = 7, // Angle of elevator, positive increasing lift.
	ARCHER_ANGLE_RUDDER = 8, // Angle of rudder, positive turning clockwise when viewed from above.
	ARCHER_ANGLE_ENUM_END = 9, // 
}