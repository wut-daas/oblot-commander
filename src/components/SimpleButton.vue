<template>
  <button
    class="inline-block py-2 px-3 rounded-sm focus:outline-none focus:ring focus:ring-opacity-50"
    :class="
      disabled
        ? 'bg-gray-300 text-gray-600 cursor-auto'
        : 'bg-wut-blue-300 text-wut-blue-900 focus:border-wut-blue-300 focus:ring-wut-blue-200 hover:bg-wut-blue-200'
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
