import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {ArcherTemperatureLocation} from '../enums/archer-temperature-location';
/*
Angle measured by a single encoder.
*/
// location See the ARCHER_ANGLE enum. uint8_t
// angle Measured angle. int16_t
export class ArcherAngle extends MAVLinkMessage {
	public location!: ArcherTemperatureLocation;
	public angle!: number;
	public _message_id: number = 44005;
	public _message_name: string = 'ARCHER_ANGLE';
	public _crc_extra: number = 69;
	public _message_fields: [string, string, boolean][] = [
		['angle', 'int16_t', false],
		['location', 'uint8_t', false],
	];
}