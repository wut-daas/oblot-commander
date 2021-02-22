<template>
  <div>
    <h2>Plot</h2>
    <svg id="plot" class="max-w-xl"></svg>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  setup() {
    const width = 640
    const height = 480
    const margin = { top: 20, right: 20, bottom: 30, left: 30 }

    const mockData = [] as { time: number; value: number }[]
    for (let i = 0; i < 50; i++) {
      mockData.push({
        time: i * 2,
        value: 50 * (1 + Math.sin(i / 5)) + 3 * Math.random(),
      })
    }

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(mockData, d => d.time) || 10])
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(mockData, d => d.value) || 10])
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

    const line = d3
      .line<{ time: number; value: number }>()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.time))
      .y(d => y(d.value))

    onMounted(() => {
      const svg = d3
        .select('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible')

      svg.append('g').call(xAxis)

      svg.append('g').call(yAxis)

      svg
        .append('path')
        .datum(mockData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', d => line(d))
    })

    return {}
  },
})
</script>

<style scoped></style>
