/* eslint-disable @typescript-eslint/camelcase */
import { MavParamType } from '@/assets/mavlink/enums/mav-param-type'
import { ParamSet } from '@/assets/mavlink/messages/param-set'
import { ParamValue } from '@/assets/mavlink/messages/param-value'
import { ref, Ref, unref } from 'vue'

export class Parameter {
  localValue: number | null
  remoteValue: number | null
  paramType: MavParamType | null
  id: string

  constructor(id = '', value: number | null = null, paramType = null) {
    this.id = id
    ;(this.localValue = value),
      (this.remoteValue = value),
      (this.paramType = paramType)
  }
}

export class ParamBuffer {
  params: Ref<Parameter[]>
  registered: boolean

  constructor() {
    this.registered = false
    this.params = ref([] as Parameter[])
  }

  handleParamValue(msg: ParamValue): void {
    const params = unref(this.params)

    if (params.length < msg.param_count) {
      for (let i = params.length; i < msg.param_count; i++) {
        params.push(new Parameter())
      }
    }

    if (
      params[msg.param_index].id !== '' &&
      params[msg.param_index].id !== msg.param_id
    ) {
      console.warn(
        `Overwritten param ${params[msg.param_index].id} with ${msg.param_id}`
      )
    }
    if (
      params[msg.param_index].paramType !== null &&
      params[msg.param_index].paramType !== msg.param_type
    ) {
      console.warn(
        `Type mismatch in parameter ${msg.param_id}, local: ${
          params[msg.param_index].paramType
        }, remote: ${msg.param_type}`
      )
    }
    params[msg.param_index].id = msg.param_id
    params[msg.param_index].remoteValue = msg.param_value
    if (params[msg.param_index].localValue === null)
      params[msg.param_index].localValue = msg.param_value
    params[msg.param_index].paramType = msg.param_type
  }

  getUpdateMessages(): ParamSet[] {
    const msgs = [] as ParamSet[]
    const params = unref(this.params)
    for (let i = 0; i < params.length; i++) {
      const p = params[i]
      if (p.localValue !== p.remoteValue && p.localValue !== null) {
        const msg = new ParamSet(0, 0) // broadcast
        msg.param_id = p.id
        msg.param_value = p.localValue
        msg.param_type =
          p.paramType !== null
            ? p.paramType
            : MavParamType.MAV_PARAM_TYPE_REAL32
        msgs.push(msg)
      }
    }
    return msgs
  }
}
