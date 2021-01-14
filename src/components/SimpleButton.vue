<template>
  <button
    class="inline-block ml-3 py-1 px-3 rounded-lg focus:outline-none focus:ring focus:ring-opacity-50"
    :class="
      disabled
        ? 'bg-gray-300 text-gray-600 focus:border-gray-300 focus:ring-gray-200 hover:bg-gray-200'
        : dark
        ? 'bg-blue-900 text-white focus:border-blue-300 focus:ring-blue-200 hover:bg-blue-700'
        : 'bg-blue-300 text-blue-900 focus:border-blue-300 focus:ring-blue-200 hover:bg-blue-200'
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
