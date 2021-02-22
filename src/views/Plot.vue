<template>
  <div>
    <h2>Plot</h2>
    <svg id="plot" class="max-w-xl"></svg>
    <SimpleButton @click="plotForce">Plot force</SimpleButton>
    <SimpleButton @click="alignForce" class="ml-2">Align force</SimpleButton>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, onMounted, ref } from 'vue'
import * as d3 from 'd3'
import SimpleButton from '@/components/SimpleButton.vue'
import { useStore } from '../store'
import { PlotDatum } from '@/store/services/plot-backend'

export default defineComponent({
  components: {
    SimpleButton,
  },
  setup() {
    const store = useStore()
    const backend = computed(() => store.state.plotBackend)

    const plottedSeriesIds = ref([] as number[])

    const width = 640
    const height = 480
    const margin = { top: 20, right: 20, bottom: 30, left: 30 }

    const x = d3
      .scaleLinear()
      .domain([0, 180])
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([-2, 2])
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = (g: any) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    const yAxis = (g: any) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g: any) => g.select('.domain').remove())
        .call((g: any) =>
          g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('Mock data value')
        )

    const line = (data: PlotDatum[], xOffset: number) =>
      d3
        .line<PlotDatum>()
        .x(d => x(d.time + xOffset))
        .y(d => y(d.value))(data)

    const draw = () => {
      const svg = d3
        .select('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible')

      svg.append('g').call(xAxis)

      svg.append('g').call(yAxis)

      svg
        .append('g')
        .attr('fill', 'none')
        .attr('id', 'seriesContainer')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
    }

    const redraw = () => {
      const g = d3.select('svg').select('#seriesContainer')
      const drawnSeries = []
      for (let i = 0; i < plottedSeriesIds.value.length; i++) {
        const element = plottedSeriesIds.value[i]
        drawnSeries.push(backend.value.series[element])
      }

      const path = g.selectAll('path').data(drawnSeries)
      path.exit().remove()
      const enter = path
        .enter()
        .append('path')
        .attr('d', d => line(d.data, d.timeOffset))
        .attr('stroke', 'steelblue')
      enter.merge(path as any).attr('d', d => line(d.data, d.timeOffset))
    }

    onMounted(() => draw())

    const plotForce = () => {
      if (plottedSeriesIds.value.length > 0) {
        return
      }
      const id = backend.value.addSeries('Force[kg]')
      plottedSeriesIds.value.push(id)

      store.state.messageBus.on('OBLOT_DYNO_FORCE', msg => {
        backend.value.series[id]?.data.push({
          time: msg.time_boot_ms / 1000,
          value: msg.force,
        })
        redraw()
      })
    }

    const alignForce = () => {
      backend.value.series[0].timeOffset = -backend.value.series[0].data[0].time
    }

    return {
      plotForce,
      alignForce,
    }
  },
})
</script>

<style scoped></style>
