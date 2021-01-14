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
    <SimpleButton @click="connectSerial" :disabled="!canConnect">
      Connect
    </SimpleButton>
    <SimpleButton @click="disconnectSerial" :disabled="!connected">
      Disconnect
    </SimpleButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import SimpleButton from '@/components/SimpleButton.vue'
import { useStore } from '../store'
import { ActionType } from '@/store/actions'
import { PortInfo } from 'serialport'

export default defineComponent({
  components: {
    SimpleButton,
  },
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
      store.dispatch(ActionType.ListPorts, undefined).then(listedPorts => {
        if (listedPorts) ports.value = listedPorts
      })
    })

    const canConnect = computed(() => {
      return (
        !connected.value && selectedBaud.value && selectedSerial.value !== ''
      )
    })

    const connectSerial = function() {
      store.dispatch(ActionType.ConnectSerial, {
        path: selectedSerial.value,
        baud: selectedBaud.value,
      })
    }

    const disconnectSerial = function() {
      store.dispatch(ActionType.DisconnectSerial, undefined)
    }

    return {
      selectedSerial,
      selectedBaud,
      connected,
      baudRates,
      ports,
      canConnect,
      connectSerial,
      disconnectSerial,
    }
  },
})
</script>

<style scoped></style>
