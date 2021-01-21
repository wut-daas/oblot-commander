import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Force measured by a load cell
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// cell_id Sensor identifier, maybe rework to an enum. uint8_t
// force Offset and scaled value in kilograms. float
// force_raw Raw reading from load cell amplifier. uint32_t
export class OblotDynoForce extends MAVLinkMessage {
	public time_boot_ms!: number;
	public cell_id!: number;
	public force!: number;
	public force_raw!: number;
	public _message_id: number = 44102;
	public _message_name: string = 'OBLOT_DYNO_FORCE';
	public _crc_extra: number = 14;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['force', 'float', false],
		['force_raw', 'uint32_t', false],
		['cell_id', 'uint8_t', false],
	];
}