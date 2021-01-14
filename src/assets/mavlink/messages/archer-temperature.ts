import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {ArcherTemperatureLocation} from '../enums/archer-temperature-location';
/*
Temperature measured by a single sensor.
*/
// location See the ARCHER_TEMPERATURE_LOCATION enum. uint8_t
// temperature Measured temperature. int16_t
export class ArcherTemperature extends MAVLinkMessage {
	public location!: ArcherTemperatureLocation;
	public temperature!: number;
	public _message_id: number = 44004;
	public _message_name: string = 'ARCHER_TEMPERATURE';
	public _crc_extra: number = 107;
	public _message_fields: [string, string, boolean][] = [
		['temperature', 'int16_t', false],
		['location', 'uint8_t', false],
	];
}