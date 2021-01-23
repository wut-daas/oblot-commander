<template>
  <nav class="absolute min-h-full w-16 flex flex-col bg-wut-black">
    <div
      v-for="route in appRoutes"
      :key="route.path"
      class="flex flex-col-reverse"
      :class="route.flexGrow ? 'flex-grow' : ''"
    >
      <router-link
        :to="route.path"
        class="relative min-w-full h-16 text-sm hover:text-white"
        :class="isCurrent(route) ? 'text-white' : 'text-wut-blue'"
      >
        <div
          v-if="isCurrent(route)"
          class="absolute top-3 h-10 w-1 rounded-r-lg bg-white"
        ></div>
        <div class="min-h-full flex items-center justify-center">
          <span>{{ route.name }}</span>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routes } from '../router'
import router from '../router'
import { AppRouteRecord } from '@/router/approuterecord'

export default defineComponent({
  setup() {
    const appRoutes = ref(routes)
    const isCurrent = function(route: AppRouteRecord) {
      return route.path === router.currentRoute.value.path
    }

    return {
      appRoutes,
      isCurrent,
    }
  },
})
</script>
