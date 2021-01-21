import { MAVLinkModule } from '@ifrunistuttgart/node-mavlink'
import { messageRegistry } from '../mavlink/message-registry'
import { OblotDynoForce } from '../mavlink/messages/oblot-dyno-force'

const mav = new MAVLinkModule(messageRegistry)

const msg = new OblotDynoForce(1, 158)

console.log(msg)
console.log(mav.pack([msg]))
