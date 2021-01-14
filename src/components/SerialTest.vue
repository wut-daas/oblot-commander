<template>
  <div>
    <p>
      <input v-model="sentText" />
      <SimpleButton @click="sendLine" :disabled="!connected">Send</SimpleButton>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../store'
import { state } from '../store/state'
import SimpleButton from '@/components/SimpleButton.vue'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const store = useStore()

    const connected = computed(() => store.getters.isConnected)
    const sentText = ref('')

    const setupDone = ref(false)
    const sendLine = function() {
      if (state.serialPort) {
        if (!setupDone.value) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const Readline = require('@serialport/parser-readline')
          const parser = state.serialPort.pipe(new Readline())
          parser.on('data', console.log)

          state.serialPort.on('close', () => (setupDone.value = false))

          setupDone.value = true
        }
        state.serialPort.write(sentText.value + '\n')
      }
    }

    return {
      connected,
      sentText,
      sendLine,
    }
  },
})
</script>

<style scoped></style>
