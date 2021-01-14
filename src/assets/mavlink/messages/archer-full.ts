import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Meant for use where auto-generated mavlink libraries cannot be deployed. Most important data from other message consolidated to be sent as a single packet. Should have fixed length (prevent truncation).
*/
// voltage Battery voltage. uint16_t
// current Current consumed from battery. uint16_t
// rpm_main Main motor revolutions per minute uint16_t
export class ArcherFull extends MAVLinkMessage {
	public voltage!: number;
	public current!: number;
	public rpm_main!: number;
	public _message_id: number = 44001;
	public _message_name: string = 'ARCHER_FULL';
	public _crc_extra: number = 112;
	public _message_fields: [string, string, boolean][] = [
		['voltage', 'uint16_t', false],
		['current', 'uint16_t', false],
		['rpm_main', 'uint16_t', false],
	];
}