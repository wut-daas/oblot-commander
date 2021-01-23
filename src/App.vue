<template>
  <Sidebar />
  <router-view class="ml-16" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

export default defineComponent({
  components: {
    Sidebar,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
