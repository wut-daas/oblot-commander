<template>
  <div>
    <h2>{{ statusText }}</h2>
    <div
      v-if="selectedConnection === 'serial'"
      class="mx-auto grid grid-cols-2 gap-3 max-w-md"
    >
      <h3 class="col-span-2 text-center">Serial device</h3>
      <p class="text-right text-lg">
        Device:
      </p>
      <select v-model="selectedSerial">
        <option disabled value="">Select serial device</option>
        <option v-for="port in ports" :key="port.path">
          {{ port.path }}
          {{ port.pnpId ? '- ' + port.pnpId.substring(0, 7) + '...' : '' }}
        </option>
      </select>
      <p class="text-right text-lg">
        Baud rate:
      </p>
      <select v-model.number="selectedBaud" :disabled="selectedSerial === ''">
        <option disabled value="">Select baud rate</option>
        <option v-for="rate in baudRates" :key="rate">
          {{ rate }}
        </option>
      </select>
      <p class="text-right">
        <SimpleButton @click="connectSerial" :disabled="!canConnect">
          Connect
        </SimpleButton>
      </p>
      <p>
        <SimpleButton @click="disconnect" :disabled="!connectionExisting">
          Disconnect
        </SimpleButton>
      </p>
    </div>
    <div v-if="availableConnections.length === 0">
      <h3 class="text-wut-orange">No connections available</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import SimpleButton from '@/components/SimpleButton.vue'
import { useStore } from '../store'
import { ActionType } from '@/store/actions'
import { PortInfo } from 'serialport'
import { ConnectionStatus } from '@/store/mavconnection'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const store = useStore()

    const connectionExisting = computed(() => store.state.connection !== null)

    const statusText = computed(() => {
      switch (store.getters.connectionStatus) {
        case ConnectionStatus.NotConnected:
          return 'Not connected'
        case ConnectionStatus.WaitingForHeartbeat:
          return 'Waiting for heartbeat'
        case ConnectionStatus.Connected:
          return 'Connected'
        case ConnectionStatus.TimedOut:
          return 'Heartbeat timed out'
        case ConnectionStatus.Closing:
          return 'Closing connection'
        case ConnectionStatus.Disconnected:
          return 'Device disconnected'
        default:
          return `Unexpected state: ${store.getters.connectionStatus}`
      }
    })

    const selectedBaud = ref(0)
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

    const selectedSerial = ref('')
    const ports = ref([] as PortInfo[])
    const availableConnections = ref([] as string[])
    const selectedConnection = computed(() => {
      if (availableConnections.value.length > 0)
        return availableConnections.value[0]
      else return ''
    })
    const refreshPorts = function() {
      store.dispatch(ActionType.CheckAvailable, undefined).then(connections => {
        if (connections) availableConnections.value = connections

        for (const conn of connections) {
          if (conn === 'serial') {
            // Must be conditionally imported via var-require, crashes application if imported in browser
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const SerialPort = require('serialport')
            SerialPort.list()
              .catch((err: Error) => {
                console.error('Error listing ports', err)
              })
              .then((listedPorts: PortInfo[]) => {
                if (listedPorts) ports.value = listedPorts
              })
          }
        }
      })
    }
    onMounted(() => refreshPorts())

    const canConnect = computed(() => {
      return (
        !connectionExisting.value &&
        selectedBaud.value &&
        selectedSerial.value !== ''
      )
    })

    const connectSerial = function() {
      // Must be conditionally imported via var-require, crashes application if imported in browser
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const SerialConnectionModule = require('@/store/serialconnection')
      const serialPath = selectedSerial.value.split(' - ')[0]
      const conn = new SerialConnectionModule.SerialConnection(
        serialPath,
        selectedBaud.value
      )
      store.dispatch(ActionType.Connect, conn)
    }

    const disconnect = function() {
      store.dispatch(ActionType.Disconnect, undefined)
    }

    return {
      statusText,
      connectionExisting,
      availableConnections,
      selectedConnection,
      selectedSerial,
      selectedBaud,
      baudRates,
      refreshPorts,
      ports,
      canConnect,
      connectSerial,
      disconnect,
    }
  },
})
</script>

<style scoped></style>
