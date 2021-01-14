import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Battery and power consumption information. All currents should be measured at battery output.
*/
// voltage Battery voltage. uint16_t
// current_motor_main Current consumed by main motor. uint16_t
// current_motor_tail1 Current consumed by 1st tail motor. uint16_t
// current_motor_tail2 Current consumed by 2nd tail motor. uint16_t
// current_servo Current consumed by servomechanism power rail. uint16_t
// current_avio Current consumed by avionics power rail. uint16_t
export class ArcherBattery extends MAVLinkMessage {
	public voltage!: number;
	public current_motor_main!: number;
	public current_motor_tail1!: number;
	public current_motor_tail2!: number;
	public current_servo!: number;
	public current_avio!: number;
	public _message_id: number = 44002;
	public _message_name: string = 'ARCHER_BATTERY';
	public _crc_extra: number = 201;
	public _message_fields: [string, string, boolean][] = [
		['voltage', 'uint16_t', false],
		['current_motor_main', 'uint16_t', false],
		['current_motor_tail1', 'uint16_t', false],
		['current_motor_tail2', 'uint16_t', false],
		['current_servo', 'uint16_t', false],
		['current_avio', 'uint16_t', false],
	];
}