<template>
  <div>
    <h2>Parameters</h2>
    <p>
      <SimpleButton @click="refresh" :disabled="!isConnected">
        Refresh
      </SimpleButton>
      <SimpleButton @click="write" :disabled="!isConnected" class="ml-2">
        Write
      </SimpleButton>
    </p>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <p class="contents font-bold">
        <span>ID <span class="font-normal">(edited in bold)</span></span>
        <span>Value</span>
      </p>
      <p v-for="p in parameters" :key="p.id" class="contents">
        <span class="my-auto" :class="!isCurrent(p) ? 'font-bold' : ''">
          {{ p.id }}
        </span>
        <span v-if="p.remoteValue">
          <input type="number" v-model.number="p.localValue" />
          <SimpleButton
            v-if="!isCurrent(p)"
            class="ml-2"
            @click="p.localValue = p.remoteValue"
          >
            Reset
          </SimpleButton>
        </span>
        <span v-else class="italic">unknown</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ActionType } from '@/store/actions'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from '../store'
import SimpleButton from '@/components/SimpleButton.vue'
import { Parameter } from '@/store/services/parameters'

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
    const write = () => store.dispatch(ActionType.WriteParams, undefined)

    const isCurrent = (p: Parameter) => p.localValue === p.remoteValue

    return {
      parameters,
      isConnected,
      refresh,
      write,
      isCurrent,
    }
  },
})
</script>

<style scoped></style>
