<template>
  <div>
    <h3>Currently {{ connected ? 'connected' : 'disconnected' }}</h3>
    <p>
      Device:
      <select v-model="selectedSerial">
        <option disabled value="">Select serial device</option>
        <option v-for="port in ports" :key="port.path">
          {{ port.path }}
        </option>
      </select>
    </p>
    <p>
      Baud rate:
      <select v-model.number="selectedBaud" :disabled="selectedSerial === ''">
        <option disabled value="">Select baud rate</option>
        <option v-for="rate in baudRates" :key="rate">
          {{ rate }}
        </option>
      </select>
    </p>
    <button
      @click="connectSerial"
      class="inline-block mt-2 px-2 py-1 rounded-md bg-blue-500 text-white"
    >
      Connect
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '../store'

import SerialPort from 'serialport'
import { PortInfo } from 'serialport'
import { ActionType } from '@/store/actions'

export default defineComponent({
  setup() {
    const store = useStore()

    const selectedSerial = ref('')
    const selectedBaud = ref(0)
    const connected = computed(() => store.getters.isConnected)

    const baudRates = ref([
      9600,
      19200,
      38400,
      57600,
      115200,
      230400,
      460800,
      921600,
    ])

    const ports = ref([] as PortInfo[])
    onMounted(() => {
      SerialPort.list()
        .then((listedPorts: PortInfo[]) => (ports.value = listedPorts))
        .catch(err => console.log(err))
    })

    const connectSerial = function() {
      store
        .dispatch(ActionType.ConnectSerial, {
          path: selectedSerial.value,
          baud: selectedBaud.value,
        })
        .then(result => console.log(result))
    }

    return {
      selectedSerial,
      selectedBaud,
      connected,
      baudRates,
      ports,
      connectSerial,
    }
  },
})
</script>

<style scoped></style>
