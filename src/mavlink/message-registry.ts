import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {OblotDynoForce} from './messages/oblot-dyno-force';
import {OblotDynoMotor} from './messages/oblot-dyno-motor';
import {OblotDynoPower} from './messages/oblot-dyno-power';
import {Heartbeat} from './messages/heartbeat';
import {ProtocolVersion} from './messages/protocol-version';
import {ParamRequestRead} from './messages/param-request-read';
import {ParamRequestList} from './messages/param-request-list';
import {ParamValue} from './messages/param-value';
import {ParamSet} from './messages/param-set';
import {CommandInt} from './messages/command-int';
import {CommandLong} from './messages/command-long';
import {CommandAck} from './messages/command-ack';
import {CommandCancel} from './messages/command-cancel';
import {MemoryVect} from './messages/memory-vect';
import {DebugVect} from './messages/debug-vect';
import {NamedValueFloat} from './messages/named-value-float';
import {NamedValueInt} from './messages/named-value-int';
import {Statustext} from './messages/statustext';
import {Debug} from './messages/debug';
import {ArcherHeartbeat} from './messages/archer-heartbeat';
import {ArcherFull} from './messages/archer-full';
import {ArcherBattery} from './messages/archer-battery';
import {ArcherRpm} from './messages/archer-rpm';
import {ArcherTemperature} from './messages/archer-temperature';
import {ArcherAngle} from './messages/archer-angle';
export const messageRegistry: Array<[number, new (system_id: number, component_id: number) => MAVLinkMessage]> = [
	[44102, OblotDynoForce],
	[44103, OblotDynoMotor],
	[44104, OblotDynoPower],
	[0, Heartbeat],
	[300, ProtocolVersion],
	[20, ParamRequestRead],
	[21, ParamRequestList],
	[22, ParamValue],
	[23, ParamSet],
	[75, CommandInt],
	[76, CommandLong],
	[77, CommandAck],
	[80, CommandCancel],
	[249, MemoryVect],
	[250, DebugVect],
	[251, NamedValueFloat],
	[252, NamedValueInt],
	[253, Statustext],
	[254, Debug],
	[44000, ArcherHeartbeat],
	[44001, ArcherFull],
	[44002, ArcherBattery],
	[44003, ArcherRpm],
	[44004, ArcherTemperature],
	[44005, ArcherAngle],
];