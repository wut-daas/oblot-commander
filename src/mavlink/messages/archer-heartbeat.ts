import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {ArcherState} from '../enums/archer-state';
/*
Custom heartbeat/status information
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// status See the ARCHER_STATE enum. uint16_t
// sync_pwm Synchronising PWM from autopilot value. uint16_t
export class ArcherHeartbeat extends MAVLinkMessage {
	public time_boot_ms!: number;
	public status!: ArcherState;
	public sync_pwm!: number;
	public _message_id: number = 44000;
	public _message_name: string = 'ARCHER_HEARTBEAT';
	public _crc_extra: number = 6;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['status', 'uint16_t', false],
		['sync_pwm', 'uint16_t', false],
	];
}