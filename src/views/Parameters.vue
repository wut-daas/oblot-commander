<template>
  <div>
    <h2>Parameters</h2>
    <p>
      <SimpleButton @click="refresh" :disabled="!isConnected">
        Refresh
      </SimpleButton>
    </p>
    <p v-for="p in parameters" :key="p.id">{{ p.id }} {{ p.remoteValue }}</p>
  </div>
</template>

<script lang="ts">
import { ActionType } from '@/store/actions'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from '../store'
import SimpleButton from '@/components/SimpleButton.vue'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const store = useStore()

    onMounted(() => store.dispatch(ActionType.RegisterParams, undefined))

    const parameters = computed(() => store.state.parameters.params)
    const isConnected = computed(() => store.getters.isConnected)

    const refresh = () => store.dispatch(ActionType.RefreshParams, undefined)

    return {
      parameters,
      isConnected,
      refresh,
    }
  },
})
</script>

<style scoped></style>
