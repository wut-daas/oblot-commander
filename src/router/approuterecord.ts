import { RouteRecordRaw } from 'vue-router'

export type AppRouteRecord = RouteRecordRaw & {
  shortcut?: string
  iconName?: string
  flexGrow?: boolean
}
