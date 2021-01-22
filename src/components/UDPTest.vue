<template>
  <div>
    <p>
      <input v-model="sentText" />
      <br />
      <span>Port offset:</span>
      <input v-model.number="portOffset" min="0" />
      <br />
      <SimpleButton @click="send" :disabled="sentText.length === 0">
        Send
      </SimpleButton>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createSocket } from 'dgram'
import SimpleButton from '@/components/SimpleButton.vue'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const sentText = ref('')

    const basePort = 54000
    const portOffset = ref(0)

    const send = function() {
      console.log(`Sending ${sentText.value}`)
      const sock = createSocket('udp4')
      const data = Buffer.from(sentText.value)

      sock.send(data, basePort + portOffset.value, err => {
        if (err) console.error('Error sending UDP data:', err)
        sock.close()
      })
    }

    return {
      sentText,
      portOffset,
      send,
    }
  },
})
</script>
