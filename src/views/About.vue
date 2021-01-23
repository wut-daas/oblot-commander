<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ColorTest />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColorTest from '@/components/ColorTest.vue'

export default defineComponent({
  components: {
    ColorTest,
  },
})
</script>
