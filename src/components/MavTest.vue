<template>
  <div>
    <p>
      <SimpleButton @click="createMessage">Create message</SimpleButton>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SimpleButton from '@/components/SimpleButton.vue'

import { MAVLinkModule } from '@ifrunistuttgart/node-mavlink'
import { messageRegistry } from '@/assets/mavlink/message-registry'
import { Statustext } from '@/assets/mavlink/messages/statustext'
import { MavSeverity } from '@/assets/mavlink/enums/mav-severity'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const createMessage = function() {
      const mav = new MAVLinkModule(messageRegistry)

      const msg = new Statustext(0, 0) // Broadcast ID
      msg.severity = MavSeverity.MAV_SEVERITY_DEBUG
      msg.text = 'Testing serialization'

      console.log(msg)
      console.log(mav.pack([msg]))
    }

    return {
      createMessage,
    }
  },
})
</script>
