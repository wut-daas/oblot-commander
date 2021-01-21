import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Rotation speed of connected motors.
*/
// rpm_main Main motor revolutions per minute uint16_t
// rpm_tail1 1st tail motor revolutions per minute uint16_t
// rpm_tail2 2nd tail motor revolutions per minute uint16_t
export class ArcherRpm extends MAVLinkMessage {
	public rpm_main!: number;
	public rpm_tail1!: number;
	public rpm_tail2!: number;
	public _message_id: number = 44003;
	public _message_name: string = 'ARCHER_RPM';
	public _crc_extra: number = 187;
	public _message_fields: [string, string, boolean][] = [
		['rpm_main', 'uint16_t', false],
		['rpm_tail1', 'uint16_t', false],
		['rpm_tail2', 'uint16_t', false],
	];
}