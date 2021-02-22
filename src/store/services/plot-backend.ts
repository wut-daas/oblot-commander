export interface PlotDatum {
  time: number
  value: number
}

export interface PlotSeries {
  data: PlotDatum[]
  name: string
  timeOffset: number
  id: number
}

export class PlotBackend {
  series: PlotSeries[] = []
  private nextSeriesId = 0

  addSeries(name: string): number {
    const newSeries = {
      data: [] as PlotDatum[],
      name,
      timeOffset: 0,
      id: this.nextSeriesId,
    }
    this.nextSeriesId += 1

    this.series.push(newSeries)

    return newSeries.id
  }
}
