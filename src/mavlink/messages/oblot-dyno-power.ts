import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Power consumption information
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// voltage Source voltage. uint16_t
// current Current consumed from source. uint16_t
export class OblotDynoPower extends MAVLinkMessage {
	public time_boot_ms!: number;
	public voltage!: number;
	public current!: number;
	public _message_id: number = 44104;
	public _message_name: string = 'OBLOT_DYNO_POWER';
	public _crc_extra: number = 231;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['voltage', 'uint16_t', false],
		['current', 'uint16_t', false],
	];
}