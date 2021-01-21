import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Information on a motor state
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// motor_id Motor identifier, maybe rework to an enum. uint8_t
// throttle_pwm Control signal pulse width. uint16_t
// rpm Motor revolutions per minute. uint16_t
export class OblotDynoMotor extends MAVLinkMessage {
	public time_boot_ms!: number;
	public motor_id!: number;
	public throttle_pwm!: number;
	public rpm!: number;
	public _message_id: number = 44103;
	public _message_name: string = 'OBLOT_DYNO_MOTOR';
	public _crc_extra: number = 230;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['throttle_pwm', 'uint16_t', false],
		['rpm', 'uint16_t', false],
		['motor_id', 'uint8_t', false],
	];
}